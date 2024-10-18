
export default function Sidebar() {
    const icons = Array(6).fill('pi pi-box')
    return(
        <div style={{width:'60px'}} className="h-full bg-sidebar p-3">
                <div className="flex flex-column gap-3">
                {icons.map((icon, index) => (
                    <i key={index} className={`${icon} text-xl text-white`}  />
                ))}
            </div>
        </div>
    )
}
