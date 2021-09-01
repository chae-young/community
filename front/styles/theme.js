const diviceSize = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "600px",
  tablet: "768px",
  desktop: "1200px",
}
const pointColor = {
  bg: "rgb(245 240 228)",
  purple: "rgb(173 134 196)",
  gray: "rgb(102,102,102)",
  border: "1px solid rgb(0, 0, 0)",
}
const device = {
  mobile: `(max-width: ${diviceSize.mobileL})`,
  MinMobile: `(min-width: ${diviceSize.mobileL})`,
  tablet: `(min-width: ${diviceSize.tablet})`,
  desktop: `(min-width: ${diviceSize.desktop})`,
}

const theme = {
  pointColor,
  device,
}

export default theme
