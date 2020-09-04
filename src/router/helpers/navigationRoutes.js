import routes from '../routes'

export default (() => {
  const naviRoutes = [...routes]

  return naviRoutes.filter(function filterRoute (route) {
    route.children = (route.children || []).filter(filterRoute)
    return route.meta && route.meta.navi && !route.meta.navi.exclude
  })
})()
