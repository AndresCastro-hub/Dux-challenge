
const Sidebar: React.FC = () => {
    const icons = Array(6).fill('pi pi-box');
    return (
        <div className="max-w-4rem h-full bg-sidebar flex justify-content-center ">
            <div className="mt-4 flex flex-column gap-3">
                {icons.map((icon, index) => (
                    <i key={index} className={`${icon} text-xl text-white`} />
                ))}
            </div>
        </div>

    );
};

export default Sidebar;
