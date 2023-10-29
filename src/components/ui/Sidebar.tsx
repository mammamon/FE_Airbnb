
export const Sidebar = () => {
    return (
      <div className="admin__sidebar d-flex justify-content-center sticky-top">
        <ul className="">
          <li><a href="" title="Dashboard"><i className="fa fa-chart-line"></i></a></li>
          <li><a href="" title="Quản lý sản phẩm" style={{ filter: 'contrast(1.5)' }}><i className="fa fa-cubes"></i></a></li>
          <li><a href="" title="Hộp thư"><i className="fa fa-envelope"></i></a></li>
          <li><a href="" title="Cài đặt"><i className="fa fa-cog"></i></a></li>
        </ul>
      </div>
    );
  };