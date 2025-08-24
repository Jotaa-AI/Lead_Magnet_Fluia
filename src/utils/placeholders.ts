export const replacePlaceholders = (text: string, context: Record<string, any>): string => {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    const value = context[key];
    
    if (value === undefined || value === null) {
      return match; // Keep original placeholder if no value
    }
    
    // Handle arrays (like herramientas, canales_captacion)
    if (Array.isArray(value)) {
      if (value.length === 0) return 'ninguna herramienta especificada';
      if (value.length === 1) return value[0];
      if (value.length === 2) return `${value[0]} y ${value[1]}`;
      return `${value.slice(0, -1).join(', ')} y ${value[value.length - 1]}`;
    }
    
    // Handle objects
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  });
};