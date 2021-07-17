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
  function upgrade1to2(schema2) {
    return {
      configType: 2,
      main: schema2.main,
      preview: schema2.preview ?? null,
      assets: {
        fonts: (schema2.assets.fonts ?? []).map((f) => {
          return {
            family: f.family,
            file: f.filename,
            weight: f.weight,
            italic: f.italic
          };
        })
      }
    };
  }
  if (schema.configType === 1) {
    schema = upgrade1to2(schema);
  }
  return {
    main: schema.main,
    preview: schema.preview ?? null,
    assets: {
      fonts: ((arr) => arr.map((font) => {
        const file = clearPath(font.file);
        return {
          family: font.family,
          file,
          url: `${templateRootUrl}/${file}`,
          weight: font.weight ?? 400,
          italic: font.italic ?? false
        };
      }))(schema.assets?.fonts ?? [])
    }
  };
}
