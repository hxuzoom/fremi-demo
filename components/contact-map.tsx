'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
	iconUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export function ContactMap() {
	const position: [number, number] = [62.5020094, 6.7033874]
	const googleMapsUrl =
		'https://www.google.com/maps/@62.5020094,6.7033874,3a,75y,31.46h,81.61t/data=!3m7!1e1!3m5!1sX-qzvkvLCezP1o7prFSxcg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D8.393930737240026%26panoid%3DX-qzvkvLCezP1o7prFSxcg%26yaw%3D31.45699354709254!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D'

	useEffect(() => {
		// Fix for SSR
		if (typeof window !== 'undefined') {
			const L = require('leaflet')
			delete L.Icon.Default.prototype._getIconUrl
			L.Icon.Default.mergeOptions({
				iconRetinaUrl:
					'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
				iconUrl:
					'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
				shadowUrl:
					'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
			})
		}
	}, [])

	return (
		<div className="relative z-10 h-full w-full">
			<MapContainer
				center={position}
				zoom={15}
				scrollWheelZoom={false}
				style={{ height: '100%', width: '100%', zIndex: 10 }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						<div className="text-center">
							<p className="mb-2 font-bold">FREMI</p>
							<p className="mb-2 text-sm">6260 SKODJE, Norway</p>
							<a
								href={googleMapsUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm text-accent hover:underline"
							>
								View on Google Maps
							</a>
						</div>
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}
