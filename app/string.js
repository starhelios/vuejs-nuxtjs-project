/**
 * Created by nikita on 15/06/2019.
 */

export const ucFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const camelCaseToDash = (string) => {
  return string.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}
