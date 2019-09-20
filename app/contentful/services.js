/**
 * Created by nikita on 18/06/2019.
 */
export const splitArray = (secondaryServices) => {
  const result = []
  let listPart = []
  const secondaryLength = Math.round(secondaryServices.length / 2)
  for (const index in secondaryServices) {
    if (!secondaryServices.hasOwnProperty(index)) continue
    if (listPart.length === secondaryLength) {
      result.push(listPart)
      listPart = []
    }
    listPart.push(secondaryServices[index])
  }
  result.push(listPart)
  return result
}
