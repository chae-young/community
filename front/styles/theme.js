const divice = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  desktop: "2560px",
}
const pointColor = {
  bg: "rgb(245 240 228)",
  purple: "rgb(173 134 196)",
  border: "1px solid rgb(0, 0, 0)",
}
const device = {
  mobile: `(min-width: ${divice.mobileS} and max-width: ${divice.tablt})`,
  tablet: `(min-width: ${divice.tablet})`,
  desktop: `(min-width: ${divice.desktop})`,
}

const theme = {
  pointColor,
  device,
}

export default theme
