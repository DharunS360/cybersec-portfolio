// Country polygons + Earth textures + Space backgrounds
// Country GeoJSON from Natural Earth (public domain)

export const COUNTRY_GEOJSON_URL =
  "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson";

// High-res earth textures (from unpkg CDN)
export const TEXTURES = {
  earth: {
    day: "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    night: "//unpkg.com/three-globe/example/img/earth-night.jpg",
    bump: "//unpkg.com/three-globe/example/img/earth-topology.png",
    water: "//unpkg.com/three-globe/example/img/earth-water.png",
  },
  clouds: "//unpkg.com/three-globe/example/img/clouds.png",
  stars: "//unpkg.com/three-globe/example/img/night-sky.png",
};

// Country polygon styling
export const COUNTRY_STYLE = {
  default: {
    color: "rgba(0, 191, 255, 0.05)",
    stroke: "rgba(0, 191, 255, 0.4)",
    strokeWidth: 0.5,
  },
  hover: {
    color: "rgba(0, 191, 255, 0.25)",
    stroke: "#00d4ff",
    strokeWidth: 1,
  },
  india: {
    color: "rgba(0, 255, 157, 0.15)",
    stroke: "#00ff9d",
    strokeWidth: 1.2,
  },
};