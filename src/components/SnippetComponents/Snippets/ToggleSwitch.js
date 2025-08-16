export const toggleSwitchSnippets = [
    {
      label: "Button 1",
      jsxCode:
        `<div className="relative inline-block w-20 h-10">
            <input type="checkbox" id="toggle" className="sr-only peer/button1" />
            <label for="toggle" className="inline-block switch-container cursor-pointer w-full h-full rounded-full animate-bounce motion-reduce:animate-none transition-colors duration-300 motion-reduce:transition-none bg-red-400 peer-checked/button1:bg-green-400 peer-checked/button1:[&>span]:translate-x-full motion-reduce:peer-checked/button1:[&>span]:transform-none">
                <span className="h-4/6 absolute top-[0.4rem] left-[0.4rem] bg-white w-2/5 rounded-full transition-all ease-in-out duration-1000 motion-reduce:transition-none"></span>
            </label>
        </div>`,
    },
    {
      label: "Button 2",
      jsxCode:
       `<div className="relative inline-block w-14 h-14">
            <input type="checkbox" id="toggle2" className="sr-only peer" />
            <label for="toggle2" className="switch-container cursor-pointer w-full h-full rounded-full transition-colors duration-300 motion-reduce:transition-none bg-red-400 peer-checked:bg-green-400 peer-checked:[&>span]:before:content-['✔'] peer-checked:[&>span]::before:absolute peer-checked:[&>span]:before:-top-[.1rem] flex justify-center items-center hover:text-2xl text-3xl ">
                <span className="h-4/5 hover:h-4/6 hover:w-4/6 bg-white w-4/5 rounded-full transition-all ease-linear duration-300 motion-reduce:transition-none relative before:content-['✖'] before:absolute before:top-[.125rem] before:left-[.1rem] before:flex before:justify-center before:items-center "></span>
            </label>
        </div>`,
    },
    {
      label: "Button 3",
      jsxCode:
        `<div className="relative inline-block w-36 h-6">
            <input type="checkbox" id="toggle3" className="sr-only peer" />
            <label for="toggle3" className="inline-block switch-container cursor-pointer w-full h-full rounded-full transition-all duration-300 motion-reduce:transition-none peer-checked:[&>span]:translate-x-[135%] motion-reduce:peer-checked:[&>span]:transform-none peer-checked:[&>span]:bg-green-400 border-black border-4">
                <span className="h-14 absolute -top-[1.3rem] left-[0.4rem] bg-red-400 w-14 rounded-xl transition-all ease-in-out duration-1000 motion-reduce:transition-none"></span>
            </label>
        </div>`,
    },
  ];