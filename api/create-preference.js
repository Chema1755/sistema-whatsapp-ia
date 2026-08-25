export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const SITE_URL = process.env.SITE_URL || "https://tu-dominio.vercel.app";

  try {
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title: "Sistema WhatsApp IA - Programa completo",
            quantity: 1,
            currency_id: "MXN",
            unit_price: 60000,
          },
        ],
        back_urls: {
          success: `${SITE_URL}/gracias.html`,
          failure: `${SITE_URL}/index.html`,
          pending: `${SITE_URL}/index.html`,
        },
        auto_return: "approved",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error de Mercado Pago:", data);
      return res.status(500).json({ error: "No se pudo crear el link de pago" });
    }

    return res.status(200).json({ init_point: data.init_point });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno" });
  }
}
