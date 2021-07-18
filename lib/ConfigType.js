export function processConfig(schema, templateRootUrl) {
  function clearPath(path) {
    if (path.startsWith("https:"))
      path.replace("https:", "");
    if (path.startsWith("http:"))
      path.replace("http:", "");
    if (path.startsWith("//"))
      path.replace("//", "");
    if (path.startsWith(".."))
      path.replace("..", "");
    if (path.startsWith("."))
      path.replace(".", "");
    if (path.startsWith("/"))
      path.replace("/", "");
    return path;
  }
  return {
    main: schema.main,
    preview: schema.preview ?? null,
    fonts: ((arr) => arr.map((font) => {
      const file = clearPath(font.file);
      return {
        id: font.id ?? null,
        family: font.family,
        file,
        url: `${templateRootUrl}/${file}`,
        weight: font.weight ?? 400,
        italic: font.italic ?? false
      };
    }))(schema.fonts ?? []),
    assets: ((arr) => arr.map((font) => {
      const file = clearPath(font.file);
      return {
        id: font.id ?? null,
        file,
        url: `${templateRootUrl}/${file}`
      };
    }))(schema.assets ?? [])
  };
}
