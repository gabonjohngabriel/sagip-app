import React, { useEffect, useRef, useState } from "react";
import {
  CardContent,
  Typography,
  Box,
  Card,
  Grid,
  Fade,
  Button,
} from "@mui/material";
import Logo from "./Logo";
import useStyles from "./Styles";
import useMapStyles from "./MapStyles";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./Map.css";

// Import the Leaflet Providers plugin properly
import "leaflet-providers";

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routingControlRef = useRef(null);
  const markersRef = useRef([]);
  const exitButtonRef = useRef(null);
  const [showCommuterGuide, setShowCommuterGuide] = useState(false);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const hospitals = [
    {
      name: "Merian Diagnostic Laboratory",
      lat: 14.952523615488879,
      lng: 120.75991397365726,
      address: "2468 St. John St. Villena Subd. 2, Apalit, 2016 Pampanga",
      image: "../images/merian.png",
      description: "Description",
      patients: getRandomNumber(0, 100),
      rooms: getRandomNumber(0, 15),
      customerservice: "Test",
      publicTransport:
        "Jeepney: Take the Apalit-San Fernando route, get off at Villena Subd.\nTricycle: Available from Apalit town proper (₱50).",
    },
    {
      name: "Apalit Doctor's Hospital",
      lat: 14.95254913946995,
      lng: 120.7638930942128,
      address: "Gonzales Ave, Apalit, 2016 Pampanga",
      image: "../images/apalit-doctors-hospital.jpg",
      description: "Description",
      patients: getRandomNumber(10, 100),
      rooms: getRandomNumber(0, 15),
      customerservice: "Test",
      publicTransport:
        "Jeepney: Take any jeepney going through Gonzales Avenue.\nBus: SM Pampanga to Apalit route, stop at town center.\nTricycle: Available from main road (₱30).",
    },
    {
      name: "GreenCity Medical Center",
      lat: 15.04413615531548,
      lng: 120.68584423557277,
      address: "San Fernando Interchange, San Fernando, 2000 Pampanga",
      image: "../images/greencity.png",
      description: "Description",
      patients: getRandomNumber(10, 100),
      rooms: getRandomNumber(0, 15),
      customerservice: "Test",
      publicTransport:
        "Bus: Any Manila-Pampanga bus, stop at San Fernando Interchange.\nJeepney: Available from main terminal to hospital (₱15).\nGrab/Taxi: Readily available in the area.",
    },
    {
      name: "Pampanga Premier Medical Center",
      lat: 14.96027668509019,
      lng: 120.75936527120034,
      address: "Apalit, Pampanga",
      image: "../images/premier.png",
      description: "Description",
      patients: getRandomNumber(10, 100),
      rooms: getRandomNumber(1, 15),
      customerservice: "Test",
      publicTransport:
        "Jeepney: Apalit-Macabebe route, stop at Premier Hospital.\nTricycle: Available from main road (₱40).",
    },
    {
      name: "Jose B. Lingad Memorial General Hospital",
      lat: 15.0346621713219,
      lng: 120.68466824622196,
      address: "San Fernando, Pampanga",
      image: "../images/jbl.png",
      description: "Description",
      patients: getRandomNumber(10, 100),
      rooms: getRandomNumber(0, 15),
      customerservice: "Test",
      publicTransport:
        "Bus: Any Manila-Pampanga bus, stop at San Fernando City.\nJeepney: City proper to JBL route available every 15 minutes.\nGrab/Taxi: Readily available in the area.",
    },
  ];

  // HOSPITAL INFO
  const toggleHospitalInfo = (hospitalId, button) => {
    const infoDiv = document.getElementById(`info-${hospitalId}`);
    if (infoDiv) {
      if (infoDiv.style.display === "none" || !infoDiv.style.display) {
        // Show
        infoDiv.style.display = "block";
        button.textContent = "Hide Current Patients";
        button.classList.add("active");
        button.classList.remove("active2");
      } else {
        // Hide
        infoDiv.style.display = "none";
        button.textContent = "Show Current Patients";
        button.classList.add("active2");
        button.classList.remove("active");
      }
    }
  };

  // HOSPITAL SERV
  const toggleHospitalService = (hospitalId, button) => {
    const serviceDiv = document.getElementById(`service-${hospitalId}`);
    if (serviceDiv) {
      if (serviceDiv.style.display === "none" || !serviceDiv.style.display) {
        // Show
        serviceDiv.style.display = "block";
        button.textContent = "Request Medical Service";
        button.classList.add("active");
        button.classList.remove("active2");
      } else {
        // Hide
        serviceDiv.style.display = "none";
        button.textContent = "Request Medical Service";
        button.classList.add("active2");
        button.classList.remove("active");
      }
    }
  };

  // SHOW INFO
  const showCommuterInfo = (hospitalId) => {
    const commuterDiv = document.getElementById(`commuter-${hospitalId}`);
    if (commuterDiv) {
      if (commuterDiv.style.display === "none" || !commuterDiv.style.display) {
        commuterDiv.style.display = "block";
      } else {
        commuterDiv.style.display = "none";
      }
    }
  };

  // SHOW SERV
  const showCustomerService = (hospitalId) => {
    const serviceDiv = document.getElementById(`service-${hospitalId}`);
    if (serviceDiv) {
      serviceDiv.style.display = "block";
      setTimeout(() => {
        serviceDiv.style.display = "none";
      }, 3000);
    }
  };

  // EMERGENCY HOTLINE
  const showEmergencyHotline = () => {
    alert("911\n\n");
  };

  // Check for traffic along route (simplified placeholder)
  const checkTrafficAlongRoute = (startPoint, endPoint) => {
    console.log("Checking traffic between", startPoint, "and", endPoint);
    // This would implement actual traffic checking logic
  };

  // LEAFLET
  useEffect(() => {
    console.log("mapRef.current:", mapRef.current);
    console.log("mapInstanceRef.current:", mapInstanceRef.current);

    if (mapRef.current && !mapInstanceRef.current) {
      console.log("Initializing map...");
      // Initialize map centered on Pampanga region
      const map = L.map(mapRef.current).setView([15.0, 120.7], 11);
      console.log("Map initialized:", map);
      mapInstanceRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      // HOSPITAL ICON
      const hospitalIcon = L.icon({
        iconUrl: "../images/hospital.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35],
      });

      // TRAFFIC ICONS
      const trafficHighIcon = L.divIcon({
        className: "traffic-icon-high",
        html: "<div style='background-color: red; border-radius: 50%; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold;'>!</div>",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const trafficMediumIcon = L.divIcon({
        className: "traffic-icon-medium",
        html: "<div style='background-color: orange; border-radius: 50%; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold;'>!</div>",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const trafficLowIcon = L.divIcon({
        className: "traffic-icon-low",
        html: "<div style='background-color: yellow; border-radius: 50%; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; color: black; font-weight: bold;'>!</div>",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      let DefaultIcon = L.icon({
        iconUrl: "../images/marker-icon.png",
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        shadowSize: [41, 41],
        iconAnchor: [12, 41],
        shadowAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      L.Marker.prototype.options.icon = DefaultIcon;

      const trafficHotspots = [
        {
          location: "San Fernando Capitol Town",
          lat: 15.025323531827555,
          lng: 120.68697553243476,
          severity: "high",
          description:
            "Heavy congestion due to market day activities. Expect 20-30 minute delays between 8AM-11AM and 4PM-7PM.",
        },
        {
          location: "Apalit Junction",
          lat: 14.949849703262817,
          lng: 120.75888693069243,
          severity: "medium",
          description:
            "Moderate traffic at the main intersection. Allow 10-15 minutes extra during rush hours.",
        },
        {
          location: "Macabebe-Apalit Road",
          lat: 14.939157381626542,
          lng: 120.73568872672192,
          severity: "low",
          description:
            "Occasional congestion due to road repairs. Minor delays of 5-10 minutes possible.",
        },
        {
          location: "San Fernando Interchange",
          lat: 15.040168654997254,
          lng: 120.68214803476384,
          severity: "high",
          description:
            "Major bottleneck during peak hours. Delays of 25-40 minutes between 7AM-9AM and 5PM-8PM.",
        },
        {
          location: "Gapan-San Fernando-Olongapo Road",
          lat: 15.0255,
          lng: 120.693,
          severity: "medium",
          description:
            "Regular congestion near commercial areas. Expect 15-20 minute delays during business hours.",
        },
        {
          location: "Apalit Bridge",
          lat: 14.95670866272175,
          lng: 120.7583970870779,
          severity: "low",
          description:
            "Slow traffic due to narrow lanes. Add 5-10 minutes to journey times.",
        },
        {
          location: "MacArthur Highway Junction",
          lat: 15.03416735082066,
          lng: 120.68684348316019,
          severity: "medium",
          description:
            "Regular traffic buildup at traffic lights. Allow extra 10-15 minutes during weekdays.",
        },
        {
          location: "Villena Subdivision Entrance",
          lat: 14.9525,
          lng: 120.761,
          severity: "low",
          description:
            "Minor congestion during school hours. Brief delays of 5 minutes from 7AM-8AM and 3PM-4PM.",
        },
        {
          location: "Mexico-San Fernando Boundary",
          lat: 15.0583,
          lng: 120.7182,
          severity: "medium",
          description:
            "Construction zone with lane restrictions. Expect 15-20 minute delays throughout the day.",
        },
      ];

      // TRAFFIC LAYER CONTROL
      const trafficLayerGroup = L.layerGroup().addTo(map);

      // TRAFFIC HOTSPOTS
      trafficHotspots.forEach((hotspot) => {
        let icon;
        switch (hotspot.severity) {
          case "high":
            icon = trafficHighIcon;
            break;
          case "medium":
            icon = trafficMediumIcon;
            break;
          default:
            icon = trafficLowIcon;
        }

        const marker = L.marker([hotspot.lat, hotspot.lng], {
          icon: icon,
        }).addTo(trafficLayerGroup);

        marker.bindTooltip(hotspot.location, {
          permanent: false,
          direction: "top",
          offset: [0, -10],
          className: "traffic-tooltip",
        });

        marker.bindPopup(`
          <div class="traffic-popup">
            <h4>${hotspot.location}</h4>
            <p>${hotspot.description}</p>
          </div>
        `);
      });

      // Initially hide traffic layer
      map.removeLayer(trafficLayerGroup);

      // MARKERS for hospitals
      hospitals.forEach((hospital) => {
        const marker = L.marker([hospital.lat, hospital.lng], {
          icon: hospitalIcon,
        }).addTo(map);

        markersRef.current.push(marker);

        // MARKER tooltip
        marker.bindTooltip(hospital.name, {
          permanent: false,
          direction: "top",
          offset: [-15, -25],
          className: "hospital-tooltip",
        });

        // INFO popup content
        const popupContent = `
          <div class="popup-content">
            <img src="${hospital.image}" alt="${
          hospital.name
        }" class="popup-image">
            <h3>${hospital.name}</h3>
            <p><strong>Address:</strong> ${hospital.address}</p>
            <p><strong>Description:</strong> ${hospital.description}</p>
            <button class="info-button" onclick="window.toggleHospitalInfo('${hospital.name.replace(
              /[^a-zA-Z0-9]/g,
              "-"
            )}', this)">
              Show Current Patients
            </button>
            <div id="info-${hospital.name.replace(
              /[^a-zA-Z0-9]/g,
              "-"
            )}" class="info-section">
            <p><strong>Patients:</strong> ${hospital.patients}</p>
            <p><strong>Available Rooms:</strong> ${hospital.rooms}</p>
          </div>
          <button class="info-button service-button" onclick="window.toggleHospitalService('${hospital.name.replace(
            /[^a-zA-Z0-9]/g,
            "-"
          )}', this)">
            Request Medical Service
          </button>
          <div id="service-${hospital.name.replace(
            /[^a-zA-Z0-9]/g,
            "-"
          )}" class="info-section">
            <p>${hospital.customerservice}.</p>
          </div>
          <button class="info-button route-button" onclick="window.calculateRoute(${
            hospital.lat
          }, ${hospital.lng})">
            Get Route
          </button>
          <button class="info-button commuter-button" onclick="window.showCommuterInfo('${hospital.name.replace(
            /[^a-zA-Z0-9]/g,
            "-"
          )}')">
            Public Transport Options
          </button>
          <div id="commuter-${hospital.name.replace(
            /[^a-zA-Z0-9]/g,
            "-"
          )}" class="info-section commuter-info">
            <p><strong>Public Transport:</strong></p>
            <p>${hospital.publicTransport}</p>
          </div>
        </div>`;

        // POPUP
        marker.bindPopup(popupContent, {
          maxWidth: 300,
        });
      });

      // COMMUTER GUIDE BUTTON
      const commuterGuideButton = L.control({ position: "topleft" });
      commuterGuideButton.onAdd = function () {
        const div = L.DomUtil.create("div", "commuter-guide-button");
        div.innerHTML = "🚌";
        div.title = "Commuter Guide";
        div.onclick = () => setShowCommuterGuide(true);
        return div;
      };
      commuterGuideButton.addTo(map);

      // TRAFFIC ALERT BUTTON
      const trafficAlertButton = L.control({ position: "topleft" });
      trafficAlertButton.onAdd = function () {
        const div = L.DomUtil.create("div", "traffic-alert-button");
        div.innerHTML = "🚦";
        div.title = "Show Traffic Alerts";
        div.onclick = function () {
          if (map.hasLayer(trafficLayerGroup)) {
            map.removeLayer(trafficLayerGroup);
            div.classList.remove("active");
          } else {
            map.addLayer(trafficLayerGroup);
            div.classList.add("active");
          }
        };
        return div;
      };
      trafficAlertButton.addTo(map);

      // EMERGENCY BUTTON
      const emergencyButton = L.control({ position: "topright" });
      emergencyButton.onAdd = function () {
        const div = L.DomUtil.create("div", "emergency-button");
        div.innerHTML = "🚑";
        div.title = "Emergency Hotline";
        div.onclick = showEmergencyHotline;
        return div;
      };
      emergencyButton.addTo(map);

      // CROSSHAIR
      const crosshairIcon = L.divIcon({
        className: "crosshair-icon",
        html: "<div style=\"width: 20px; height: 20px; background: url('https://static-00.iconduck.com/assets.00/crosshair-icon-2048x2048-5h6w9rqc.png') no-repeat center center; background-size: contain;\"></div>",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const crosshairMarker = L.marker(map.getCenter(), {
        icon: crosshairIcon,
        interactive: false,
      }).addTo(map);

      map.on("move", function () {
        crosshairMarker.setLatLng(map.getCenter());
      });

      // ROUTING - Fixed implementation
      const calculateRoute = (lat, lng) => {
        console.log("🛣️ Route requested to:", lat, lng);

        // Clean up previous routing control if it exists
        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
        }

        // Create a new routing control with current map center as start point
        routingControlRef.current = L.Routing.control({
          waypoints: [L.latLng(map.getCenter()), L.latLng(lat, lng)],
          routeWhileDragging: true,
          lineOptions: {
            styles: [
              { color: "green", opacity: 0.8, weight: 6 },
              { color: "white", opacity: 0.5, weight: 2 },
            ],
          },
          createMarker: function (i, waypoint, n) {
            const icons = [DefaultIcon, hospitalIcon];
            return L.marker(waypoint.latLng, {
              draggable: i === 0,
              icon: icons[i] || DefaultIcon,
            });
          },
          addWaypoints: false,
          showAlternatives: false,
          fitSelectedRoutes: true,
        }).addTo(map);

        // Add instruction to place location
        const instructionDiv = L.DomUtil.create("div", "place-instruction");
        instructionDiv.innerHTML =
          "Click on the map to set your starting point";
        instructionDiv.style.position = "absolute";
        instructionDiv.style.top = "10px";
        instructionDiv.style.left = "50%";
        instructionDiv.style.transform = "translateX(-50%)";
        instructionDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        instructionDiv.style.padding = "10px";
        instructionDiv.style.borderRadius = "5px";
        instructionDiv.style.zIndex = "1000";
        map._container.appendChild(instructionDiv);

        // One-time click handler to set start point
        const onMapClick = function (e) {
          routingControlRef.current.spliceWaypoints(0, 1, e.latlng);
          map.off("click", onMapClick);
          map._container.removeChild(instructionDiv);

          // Check for traffic along the route
          checkTrafficAlongRoute(e.latlng, L.latLng(lat, lng));

          // Add exit button
          if (!exitButtonRef.current) {
            const exitBtn = L.control({ position: "topright" });
            exitBtn.onAdd = function () {
              const div = L.DomUtil.create("div", "exit-button");
              div.innerHTML = "Exit Route";
              div.onclick = function () {
                map.removeControl(routingControlRef.current);
                map.removeControl(exitBtn);
                routingControlRef.current = null;
                exitButtonRef.current = null;
              };
              return div;
            };
            exitBtn.addTo(map);
            exitButtonRef.current = exitBtn;
          }
        };

        map.on("click", onMapClick);

        // Try to get user's location
        map.locate({ setView: false });
        map.on("locationfound", function (e) {
          routingControlRef.current.spliceWaypoints(0, 1, e.latlng);
          map.off("click", onMapClick);
          if (instructionDiv.parentNode) {
            map._container.removeChild(instructionDiv);
          }
          checkTrafficAlongRoute(e.latlng, L.latLng(lat, lng));
        });

        // Close any open popups
        map.closePopup();
      };

      // Expose functions to window object for popup buttons
      window.toggleHospitalInfo = toggleHospitalInfo;
      window.toggleHospitalService = toggleHospitalService;
      window.showCustomerService = showCustomerService;
      window.calculateRoute = calculateRoute;
      window.showCommuterInfo = showCommuterInfo;
    }

    return () => {
      // CLEANUP
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // COMMUTER GUIDE TEXT
  const MapStyles = useMapStyles();
  const styles = useStyles();
  const CommuterGuideModal = () => {
    if (!showCommuterGuide) return null;

    return (
      <div className={MapStyles.commuterGuideModal}>
        <div className={`${MapStyles.commuterGuideContent} ${styles.poppins}`}>
          <h2>Commuter Guide to Hospitals</h2>

          <h3>Major Public Transport Options</h3>
          <ul>
            <p>
              <strong>Buses:</strong> Manila-Pampanga routes operate from 4AM to
              10PM daily.
            </p>
            <p>
              <strong>Jeepneys:</strong> Local routes connect most towns in
              Pampanga.
            </p>
            <p>
              <strong>Tricycles:</strong> Available for short distances from
              main roads.
            </p>
            <p>
              <strong>Grab/Taxi:</strong> Available in San Fernando and major
              towns.
            </p>
          </ul>
          <div className={MapStyles.hospitalTransportInfo}></div>
          <h3>Transportation Tips</h3>
          <ul>
            <p>Keep small change ready for jeepneys and tricycles</p>
            <p>Download Grab app for easier taxi booking</p>
            <p>Allow extra time during rush hours (7-9AM, 5-7PM)</p>
            <p>For emergencies, call local hospital ambulance services</p>
          </ul>

          <button
            className={`${styles.poppins} ${MapStyles.closeGuideButton}`}
            onClick={() => setShowCommuterGuide(false)}
          >
            Close Guide
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div ref={mapRef} className={`${styles.mapContent} ${styles.center}`} />
      {showCommuterGuide && <CommuterGuideModal />}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .traffic-alert-button {
          background: white;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          cursor: pointer;
          margin-top: 10px;
        }
        
        .traffic-alert-button.active {
          background: #f0f0f0;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        }
        
        .commuter-guide-button {
          background: white;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          cursor: pointer;
        }
        
        .commuter-guide-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .commuter-guide-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }
        
        .commuter-info {
          background: #f0f8ff;
          border-left: 3px solid #4682B4;
          padding: 8px;
          margin-top: 8px;
        }
        
        .commuter-button {
          background: #4682B4 !important;
          color: white !important;
        }
        
        .traffic-tooltip {
          font-weight: bold;
        }
        
        .close-guide-button {
          background: #4682B4;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
        }
        
        .hospital-transport-info {
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .hospital-transport-info {
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        .emergency-button {
          background: white;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          cursor: pointer;
        }

        .traffic-popup h4 {
          margin: 0 0 8px 0;
          color: #333;
        }

        .traffic-popup p {
          margin: 0;
          font-size: 13px;
        }

        .hospital-tooltip {
          font-weight: bold;
          font-size: 14px;
        }

        .exit-button {
          background: white;
          padding: 8px 12px;
          font-weight: bold;
          cursor: pointer;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        .exit-button:hover {
          background: #f0f0f0;
        }
        `,
        }}
      />
    </>
  );
};

export default MapComponent;
