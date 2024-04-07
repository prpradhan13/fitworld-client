

function AreYouSure({setAskPopUp, selected, setSelected, remove}) {

  return (
    <div className="fixed top-5 w-full bg-transparent flex justify-center items-center">
      <div className="bg-neutral-100 rounded-lg p-3 w-[300px]">
        <h2 className="text-lg font-medium text-center text-black">Are you sure to remove {selected.name}?</h2>
        <div className="flex gap-1 mt-2 font-medium">
            <button 
                type="button"
                onClick={() => {
                    remove();
                    setSelected(null);
                    setAskPopUp(false);
                }}
                className="bg-red-500 rounded-lg px-1 w-1/2 text-white"
            >
                Yes
            </button>
            <button 
                type="button" 
                onClick={() => {
                    setSelected(null);
                    setAskPopUp(false);
                }} 
                className="bg-blue-500 rounded-lg px-1 w-1/2 text-white"
            >
                No
            </button>
        </div>
      </div>
    </div>
  )
}

export default AreYouSure
