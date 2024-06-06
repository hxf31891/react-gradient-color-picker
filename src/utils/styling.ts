export type CssModules = Record<string, string>

// Usage example
// const combinedCss = combineMultipleCssModules(coreCss, darkThemeCss /*, otherCssModules */)
export function combineMultipleCssModules(
  ...cssModules: CssModules[]
): CssModules {
  return cssModules.reduce((acc, module) => {
    Object.keys(module).forEach((key: string) => {
      // Ensure only non-undefined values are concatenated.
      const classList = [acc[key], module[key]].filter(Boolean).join(' ')
      if (classList) {
        acc[key] = classList
      }
    })

    return acc
  }, {} as CssModules)
}
