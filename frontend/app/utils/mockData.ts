export interface Disruption {
  id: string
  type: string
  location: [number, number]
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  affectedRoutes: number
  timestamp: string
  description: string
}

const disruptionTypes = [
  'Port Congestion',
  'Weather Delay',
  'Labor Strike',
  'Infrastructure Damage',
  'Customs Delay',
  'Cyber Security Incident',
  'Equipment Failure',
  'Fuel Shortage',
  'Geopolitical Tension',
  'Natural Disaster',
  'Traffic Accident',
  'Border Closure',
  'Power Outage',
  'Supply Shortage',
  'Pandemic Restrictions',
  'Vessel Grounding',
  'Container Shortage',
  'Crane Malfunction',
  'Dock Strike',
  'Pilot Shortage',
  'Berth Unavailability',
  'Tugboat Shortage',
  'Terminal Congestion',
  'Rail Disruption',
  'Truck Driver Shortage',
  'Warehouse Capacity',
  'Cold Storage Failure',
  'Hazmat Incident',
  'Oil Spill',
  'Fire Emergency',
  'Flooding',
  'Hurricane Warning',
  'Typhoon Alert',
  'Earthquake',
  'Tsunami Warning',
  'Volcanic Ash',
  'Ice Formation',
  'Dense Fog',
  'High Winds',
  'Lightning Strike',
  'Sandstorm',
  'Extreme Heat',
  'Extreme Cold',
  'Heavy Rain',
  'Snow Storm',
  'Piracy Threat',
  'Security Breach',
  'Terrorism Alert',
  'Military Exercise',
  'Naval Blockade',
  'Sanctions',
  'Trade Embargo',
  'Import Ban',
  'Export Restrictions',
  'Tariff Changes',
  'Currency Fluctuation',
  'Insurance Issues',
  'Vessel Detention',
  'Cargo Inspection',
  'Quarantine',
  'Pest Control',
  'Contamination',
  'Spoilage',
  'Theft',
  'Vandalism',
  'Riot',
  'Civil Unrest',
  'Political Instability',
  'Government Shutdown',
  'Regulatory Changes',
  'Environmental Protest',
  'Air Quality Alert',
  'Water Shortage',
  'Dredging Operations',
  'Channel Maintenance',
  'Bridge Closure',
  'Road Construction',
  'IT System Failure',
  'Communication Outage',
  'GPS Disruption',
  'Navigation Error',
  'Chart Update',
  'Buoy Malfunction',
  'Lighthouse Failure',
  'Signal Disruption',
  'AIS Failure',
  'Radar Malfunction',
  'VHF Radio Issue',
  'Sonar Problem',
  'Engine Failure',
  'Hull Damage',
  'Propeller Issue',
  'Rudder Malfunction',
  'Anchor Dragging',
  'Mooring Failure',
  'Rope Snap',
  'Chain Break'
]

const majorPorts = [
  { name: 'Shanghai', coords: [121.4737, 31.2304] as [number, number] },
  { name: 'Singapore', coords: [103.8198, 1.3521] as [number, number] },
  { name: 'Shenzhen', coords: [114.0579, 22.5431] as [number, number] },
  { name: 'Ningbo-Zhoushan', coords: [121.5440, 29.8683] as [number, number] },
  { name: 'Guangzhou Harbor', coords: [113.2644, 23.1291] as [number, number] },
  { name: 'Busan', coords: [129.0756, 35.1796] as [number, number] },
  { name: 'Hong Kong', coords: [114.1694, 22.3193] as [number, number] },
  { name: 'Qingdao', coords: [120.3826, 36.0671] as [number, number] },
  { name: 'Tianjin', coords: [117.2008, 39.0842] as [number, number] },
  { name: 'Rotterdam', coords: [4.4777, 51.9244] as [number, number] },
  { name: 'Antwerp', coords: [4.4025, 51.2194] as [number, number] },
  { name: 'Los Angeles', coords: [-118.2437, 34.0522] as [number, number] },
  { name: 'Long Beach', coords: [-118.1937, 33.7701] as [number, number] },
  { name: 'Hamburg', coords: [9.9937, 53.5511] as [number, number] },
  { name: 'New York/New Jersey', coords: [-74.0060, 40.7128] as [number, number] },
  { name: 'Dubai', coords: [55.2708, 25.2048] as [number, number] },
  { name: 'Tanjung Pelepas', coords: [103.5500, 1.3667] as [number, number] },
  { name: 'Kaohsiung', coords: [120.2513, 22.6273] as [number, number] },
  { name: 'Xiamen', coords: [118.0894, 24.4798] as [number, number] },
  { name: 'Dalian', coords: [121.6147, 38.9140] as [number, number] },
  { name: 'Savannah', coords: [-81.0998, 32.0809] as [number, number] },
  { name: 'Seattle', coords: [-122.3321, 47.6062] as [number, number] },
  { name: 'Vancouver', coords: [-123.1216, 49.2827] as [number, number] },
  { name: 'Melbourne', coords: [144.9631, -37.8136] as [number, number] },
  { name: 'Sydney', coords: [151.2093, -33.8688] as [number, number] },
  { name: 'Genoa', coords: [8.9463, 44.4056] as [number, number] },
  { name: 'Barcelona', coords: [2.1734, 41.3851] as [number, number] },
  { name: 'Valencia', coords: [-0.3763, 39.4699] as [number, number] },
  { name: 'Piraeus', coords: [23.6433, 37.9420] as [number, number] },
  { name: 'Jeddah', coords: [39.1925, 21.5433] as [number, number] },
  { name: 'Santos', coords: [-46.3336, -23.9608] as [number, number] },
  { name: 'Buenos Aires', coords: [-58.3816, -34.6037] as [number, number] },
  { name: 'Tokyo', coords: [139.6917, 35.6895] as [number, number] },
  { name: 'Yokohama', coords: [139.6380, 35.4437] as [number, number] },
  { name: 'Kobe', coords: [135.1955, 34.6901] as [number, number] },
  { name: 'Colombo', coords: [79.8612, 6.9271] as [number, number] },
  { name: 'Chennai', coords: [80.2707, 13.0827] as [number, number] },
  { name: 'Mumbai', coords: [72.8777, 19.0760] as [number, number] },
  { name: 'Karachi', coords: [67.0099, 24.8607] as [number, number] },
  { name: 'Jakarta', coords: [106.8456, -6.2088] as [number, number] },
  { name: 'Manila', coords: [120.9842, 14.5995] as [number, number] },
  { name: 'Ho Chi Minh', coords: [106.6297, 10.8231] as [number, number] },
  { name: 'Bangkok', coords: [100.5018, 13.7563] as [number, number] },
  { name: 'Cape Town', coords: [18.4241, -33.9249] as [number, number] },
  { name: 'Durban', coords: [31.0218, -29.8587] as [number, number] },
  { name: 'Lagos', coords: [3.3792, 6.5244] as [number, number] },
  { name: 'Mombasa', coords: [39.6682, -4.0435] as [number, number] },
  { name: 'Istanbul', coords: [28.9784, 41.0082] as [number, number] },
  { name: 'Haifa', coords: [34.9896, 32.7940] as [number, number] },
  { name: 'Alexandria', coords: [29.9187, 31.2001] as [number, number] }
]

const descriptions = [
  'Heavy container backlog causing 48-72 hour delays',
  'Severe weather conditions affecting all operations',
  'Workers demanding better conditions and higher wages',
  'Recent storm damaged loading equipment and infrastructure',
  'Documentation processing delays of 24+ hours',
  'Ransomware attack on port systems causing shutdowns',
  'Crane malfunction halting all loading operations',
  'Limited fuel availability for vessels - 30% capacity',
  'Trade restrictions impacting cargo flow significantly',
  'Earthquake damaged port infrastructure - 15% capacity',
  'Multi-vehicle collision blocking main access road',
  'Temporary closure for heightened security reasons',
  'Grid failure affecting 80% of port operations',
  'Container shortage impacting 65% of capacity',
  'Health screening protocols causing 18 hour delays',
  'Vessel grounding in shipping channel blocking access',
  'Labor union negotiations ongoing - strike possible',
  'Extreme heat affecting operations and worker safety',
  'Flooding in port area submerging 40% of docks',
  'Customs inspection backlog of 500+ containers',
  'Terminal congestion with 72 hour wait times',
  'Pilot boat shortage causing vessel queue',
  'Tugboat maintenance reducing available fleet by 50%',
  'Berth unavailability due to emergency repairs',
  'Rail disruption affecting inland cargo movement',
  'Truck driver shortage causing 48hr pickup delays',
  'Warehouse at full capacity - no space available',
  'Cold storage facility failure affecting perishables',
  'Hazmat incident requiring evacuation of sector B',
  'Oil spill containment operations ongoing',
  'Fire emergency in container yard - section closed',
  'Flash flooding submerging cargo handling area',
  'Hurricane warning issued - operations suspended',
  'Typhoon approaching - vessels advised to depart',
  'Seismic activity detected - structural assessment needed',
  'Tsunami warning forcing immediate evacuation',
  'Volcanic ash affecting visibility and equipment',
  'Ice formation in channel requiring icebreaker',
  'Dense fog reducing visibility to 50 meters',
  'High winds exceeding 50 knots - unsafe conditions',
  'Lightning strikes damaging electrical systems',
  'Sandstorm reducing visibility and damaging equipment',
  'Record high temperatures forcing reduced operations',
  'Extreme cold freezing loading mechanisms',
  'Heavy rain causing drainage system overflow',
  'Severe snowstorm blocking all road access',
  'Piracy threat elevated in surrounding waters',
  'Security breach detected in access control systems',
  'Terrorism alert raising security level to maximum',
  'Military exercise restricting navigation in area',
  'Naval blockade announced by neighboring country',
  'Economic sanctions affecting cargo clearance',
  'Trade embargo halting specific commodity imports',
  'Import ban on agricultural products implemented',
  'New export restrictions causing permit delays',
  'Tariff changes creating customs processing delays',
  'Currency devaluation affecting payment processing',
  'Insurance claim disputes delaying vessel departure',
  'Vessel detained for regulatory inspection',
  'Intensive cargo inspection for contraband',
  'Mandatory quarantine period for arriving vessels',
  'Pest control fumigation closing terminal',
  'Cargo contamination discovered - investigation ongoing',
  'Temperature-sensitive goods spoilage detected',
  'Cargo theft incident under investigation',
  'Vandalism damage to loading equipment',
  'Riot near port area affecting worker attendance',
  'Civil unrest in city causing operational disruptions',
  'Political instability affecting port operations',
  'Government shutdown delaying permit approvals',
  'New environmental regulations requiring compliance',
  'Environmental protest blocking port entrance',
  'Air quality alert limiting outdoor operations',
  'Water shortage affecting firefighting capability',
  'Channel dredging operations restricting navigation',
  'Scheduled maintenance closing main channel',
  'Bridge inspection closing access road',
  'Major road construction causing 3-hour delays',
  'Port management system failure - manual operations',
  'Satellite communication outage affecting tracking',
  'GPS jamming detected in port vicinity',
  'Navigation error causing near-miss incident',
  'Nautical chart updates requiring route changes',
  'Navigation buoy damaged and off-station',
  'Lighthouse backup generator failure',
  'VTS signal disruption affecting vessel guidance',
  'AIS transponder malfunction on multiple vessels',
  'Port radar system requiring emergency maintenance',
  'VHF radio interference from unknown source',
  'Echo sounder malfunction affecting depth readings',
  'Main engine failure on vessel blocking berth',
  'Hull breach requiring emergency drydocking',
  'Propeller fouling causing reduced speed',
  'Rudder hydraulics failure requiring tow assistance',
  'Anchor dragging in strong current - drifting',
  'Mooring line parted under load - vessel adrift',
  'Towing rope failure during berthing operation',
  'Anchor chain break requiring emergency repair'
]

export function generateMockDisruptions(count: number = 150): Disruption[] {
  const disruptions: Disruption[] = []
  const severities: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high', 'critical']

  for (let i = 0; i < count; i++) {
    const port = majorPorts[Math.floor(Math.random() * majorPorts.length)]
    const severity = severities[Math.floor(Math.random() * severities.length)]
    const type = disruptionTypes[Math.floor(Math.random() * disruptionTypes.length)]
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]

    // Add some random offset to port location for variety
    const locationOffset = 0.5
    const location: [number, number] = [
      port.coords[0] + (Math.random() - 0.5) * locationOffset,
      port.coords[1] + (Math.random() - 0.5) * locationOffset
    ]

    const hoursAgo = Math.floor(Math.random() * 72)
    const timestamp = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()

    disruptions.push({
      id: `disruption-${i + 1}`,
      type,
      location,
      severity,
      confidence: 0.75 + Math.random() * 0.24, // 75-99%
      affectedRoutes: Math.floor(Math.random() * 20) + 1,
      timestamp,
      description: `${port.name}: ${description}`
    })
  }

  return disruptions.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical': return '#dc2626'
    case 'high': return '#ef4444'
    case 'medium': return '#f59e0b'
    case 'low': return '#22c55e'
    default: return '#6b7280'
  }
}

export function getSeverityLabel(severity: string): string {
  return severity.charAt(0).toUpperCase() + severity.slice(1)
}
