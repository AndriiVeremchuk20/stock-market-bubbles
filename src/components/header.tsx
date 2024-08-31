import {useAtom} from "jotai"
import {OrbitControlsAtom} from "~/store"

export const Header = () => {

	const [enabledOrbitControls, setEnabledOrbitControls] = useAtom(OrbitControlsAtom)

	const handleClick = () => {
			setEnabledOrbitControls(prev=>!prev);

	}

	return <header className="h-[100px]">
			<button onClick={handleClick} className="bg-gray-400 text-white"> {enabledOrbitControls?"Disable":"Enable"}</button>
	</header>
}
