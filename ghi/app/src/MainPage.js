function MainPage({automobiles}) {
    return (
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Wheelz</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
           The one-stop-shop to buy and service your Wheelz!
          </p>
        </div>
        <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={`${automobiles[1].model.picture_url}`} className="d-block w-100" alt="..."/>
          <div className="carousel-caption d-none d-md-block">
            <h5>{`${automobiles[1].model.manufacturer.name} ${automobiles[1].model.name}`}</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src={`${automobiles[2].model.picture_url}`} className="d-block w-100" alt="..."/>
          <div className="carousel-caption d-none d-md-block">
            <h5>{`${automobiles[2].model.manufacturer.name} ${automobiles[2].model.name}`}</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src={`${automobiles[4].model.picture_url}`} className="d-block w-100" alt="..."/>
          <div className="carousel-caption d-none d-md-block">
            <h5>{`${automobiles[4].model.manufacturer.name} ${automobiles[4].model.name}`}</h5>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
</div>
      </div>
    );
  }
  
  export default MainPage;
  