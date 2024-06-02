

export function Button({label, onClick}) {
    return <button onClick={onClick} type="button" className="w-full text-white bg-gray-800 hover:bg-amber-300 hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-5 py-[1vh] me-2 mb-2">{label}</button>
}
  