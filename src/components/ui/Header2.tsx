export const Header2 = () => {
    return (
        <div className="admin__header__wrapper me-0 px-[20px]">
            <div className="admin__header flex align-items-center">
                <div className="logo">
                    <img src="../../../images/airbnb.svg" className="w-[130px] h-[32px]" />
                    <h4>|Admin|</h4>
                </div>
                <div className="switch text-white">
                    <a href=".">Về trang chủ</a>
                </div>
            </div>
        </div>
    );
};
