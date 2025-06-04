// huggingface.ts

const HUGGING_FACE_TOKEN = ""; //Agregar su token

const MODEL_URL = "https://api-inference.huggingface.co/models/facebook/deit-base-distilled-patch16-224";

/**
 * Detecta etiquetas de objetos en la imagen usando el modelo rápido y centrado.
 * @param base64Image La imagen en base64 (puede venir con o sin prefijo data:)
 * @returns Array de etiquetas detectadas en minúsculas
 */
export async function detectObjects(base64Image: string): Promise<string[]> {
  try {
    const cleanBase64 = base64Image.startsWith("data:")
      ? base64Image.split(",")[1]
      : base64Image;

    const binaryImage = Uint8Array.from(atob(cleanBase64), (c) => c.charCodeAt(0));

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/octet-stream",
      },
      body: binaryImage,
    });

    if (!response.ok) {
      console.error(`Error HTTP ${response.status} al llamar al modelo`);
      return [];
    }

    const result = await response.json();

    if (Array.isArray(result) && result.length > 0) {
      const detectedLabels = result.map((item: any) =>
        item.label.toLowerCase()
      );

      const matchedObjects = new Set<string>();

      for (const label of detectedLabels) {
        for (const [objectName, synonyms] of Object.entries(SYNONYMS_MAP)) {
          for (const synonym of synonyms) {
            if (label.includes(synonym)) {
              matchedObjects.add(objectName);
              break; // Pasamos al siguiente label
            }
          }
        }
      }

      return Array.from(matchedObjects); // Sin repetidos
    }

    return [];
  } catch (error) {
    console.error("Error en detectObjects:", error);
    return [];
  }
}

/**
 * Diccionario de sinónimos para los objetos del juego
 */
export const SYNONYMS_MAP: Record<string, string[]> = {
  "manzana": ["apple", "fruit", "red", "manzana"],
  "lápiz": ["pencil", "pen", "writing", "lapiz"],
  "gafas": ["glasses", "eyewear", "spectacles", "sunglasses", "gafas"],
  "botella": ["bottle", "water", "drink", "botella"],
  "zapatilla": ["shoe", "sneaker", "footwear", "boot", "zapatilla"],
  "planta": ["plant", "flower", "leaf", "green", "planta"],
  "libro": ["book", "notebook", "reading", "libro"],
  "taza": ["cup", "mug", "coffee", "tea", "taza"],
  "silla": ["chair", "seat", "silla"],
  "mochila": ["backpack", "bag", "mochila"],
  "teléfono": ["phone", "mobile", "smartphone", "cellphone", "telefono", "teléfono"],
  "regla": ["ruler", "measuring", "scale", "regla"],
  "cuaderno": ["notebook", "journal", "writing", "cuaderno"],
  "peluche": ["teddy", "plush", "stuffed", "toy", "peluche"],
  "pizarra": ["whiteboard", "blackboard", "board", "pizarra"],
  "mouse": ["mouse", "computer", "click", "ratón"],
  "teclado": ["keyboard", "computer", "typing", "teclado"],
  "juguete": ["toy", "play", "juguete"],
  "lámpara": ["lamp", "light", "bulb", "lámpara"],
  "cable": ["cable","wire","cord","power","charging","charger","electric","usb cable","plug","line"],
};
