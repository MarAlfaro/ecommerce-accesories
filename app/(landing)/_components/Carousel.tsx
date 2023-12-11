import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'app/globals.css';


const whatsappIcon = '/whatsapp.png'; 

const OffersSection: React.FC = () => {
  const offersStyles: React.CSSProperties = {
    textAlign: 'center',
    marginTop: '5%',
    width: '100%',
    marginBottom: '5%',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const cardStyles: React.CSSProperties = {
    width: '30%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const cardImageStyles: React.CSSProperties = {
    width: '100%',
    height: 'auto',
  };

  const cardContentStyles: React.CSSProperties = {
    padding: '16px',
  };

  const offerTitleStyles: React.CSSProperties = {
    fontSize: '39px',
    fontWeight: 'bold',
    color: 'red',
    marginBottom: '10px',
  };

  const offerDescriptionStyles: React.CSSProperties = {
    fontSize: '16px',
    textAlign: 'center',
    lineHeight: '1.5',
    color: 'black',
  };

  const seasonalOffers = [
    {
      title: '¡Oferta de Temporada!',
      description: 'Aprovecha nuestras ofertas exclusivas de temporada. Descuentos increíbles en productos seleccionados.',
      image: 'Copas para carro.jpg',
    },
    {
      title: 'Descuento Especial',
      description: 'Por tiempo limitado, disfruta de un descuento adicional del 15% en todos los productos de esta línea. ¡No te lo pierdas!',
      image: 'Casco para bicicleta.jpg',
    },
    {
      title: 'Oferta de fin año',
      description: 'Nueva oferta disponible. ¡Descúbrelo ahora!',
      image: 'Forro de asiento de bicicleta.jpg',
    },
  ];

  return (
    <div style={offersStyles}>
      {seasonalOffers.map((offer, index) => (
        <div key={index} style={cardStyles}>
          <div style={cardContentStyles}>
            <h3 style={offerTitleStyles}>{offer.title}</h3>
            <p style={offerDescriptionStyles}>{offer.description}</p>
          </div>
          {offer.image && <img src={offer.image} alt={`Oferta ${index + 1}`} style={cardImageStyles} />}
        </div>
      ))}
    </div>
  );
};

const MyCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const upperContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
  };

  const carouselContainerStyles: React.CSSProperties = {
    width: '50%',
    marginRight: '20px',
  };

  const contentContainerStyles: React.CSSProperties = {
    width: '50%',
  };

  const imageStyles: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '500px',
  };

  const thumbnailContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const thumbnailStyles: React.CSSProperties = {
    maxWidth: '50px',
    maxHeight: '150px',
    margin: '5px',
    cursor: 'pointer',
  };

  const lowerContainerStyles: React.CSSProperties = {
    width: '100%',
  };

  const cardStyles: React.CSSProperties = {
    padding: '20px',
    backgroundColor: 'white',
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'justify',
  };

  const productNameStyles: React.CSSProperties = {
    fontSize: '35px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'justify',
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: '20px',
    textAlign: 'justify',
    lineHeight: '1.5',
    marginRight: '10%',
  };

  const bottomTextStyles: React.CSSProperties = {
    fontSize: '40px',
    textAlign: 'center',
    marginTop: '-3%',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '5%',
    backgroundColor: 'red',
    padding: '10px',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    animation: 'moveLetters 2s infinite linear',
  };

  const products = [
    {
      name: 'Casco de motocicleta',
      description: 'Sumérgete en el mundo de la conducción segura y con estilo con nuestro casco para motocicleta de alta gama. Diseñado para los apasionados de la carretera que buscan la combinación perfecta entre protección y elegancia, este casco redefine los estándares de seguridad y estilo. La carcasa externa de fibra de carbono no solo proporciona una resistencia excepcional a los impactos, sino que también garantiza un diseño aerodinámico y liviano que te permitirá disfrutar de cada tramo de carretera con comodidad. El sistema de ventilación inteligente mantiene tu cabeza fresca en todo momento, mientras que el forro interior antibacteriano proporciona una experiencia de uso higiénica y cómoda.',
      image: 'Casco de motocicleta.jpg',
    },
    {
      name: 'Casco para bicicleta',
      description: 'Explora la combinación perfecta de seguridad y estilo con nuestro casco para bicicleta diseñado para los amantes del ciclismo que aprecian la máxima protección sin comprometer la estética. Este casco vanguardista no solo cumple con los más altos estándares de seguridad, con su resistente carcasa externa y un sistema de absorción de impactos de última generación, sino que también incorpora un diseño aerodinámico y moderno. Las líneas elegantes y los detalles contemporáneos no solo te mantendrán protegido, sino que también te harán destacar en cualquier recorrido.',
      image: 'Casco para bicicleta.jpg',
    },
    {
      name: 'Copas para carro',
      description: 'El tono rosa cautivador de las copas resalta con un brillo sutil, atrayendo miradas admirativas en cada giro de rueda. La calidad premium de los materiales asegura durabilidad y resistencia, mientras que el diseño meticuloso agrega un toque de glamour a tus ruedas. La instalación es fácil y segura, proporcionando un cambio instantáneo y sorprendente en la apariencia de tu vehículo. Con estas copas rosadas para carro, convertirás cada viaje en una experiencia única y estilizada. Celebra tu individualidad y destaca en la carretera con un toque de color y elegancia que refleje tu propio sentido de la moda.',
      image: 'Copas para carro.jpg',
    },
    {
      name: 'Forro de asiento de bicicleta',
      description: 'Eleva la comodidad y el estilo de tu experiencia en bicicleta con nuestro forro de asiento diseñado para satisfacer las demandas de los ciclistas apasionados. Este forro no solo proporciona un nivel excepcional de confort, sino que también agrega un toque de estilo a tu bicicleta. Confeccionado con materiales de alta calidad, nuestro forro de asiento está diseñado para resistir el desgaste diario y ofrecer un soporte ergonómico. La tecnología de absorción de impactos integrada proporciona una experiencia de conducción suave, incluso en terrenos irregulares, mientras que el diseño perforado mejora la ventilación, manteniéndote fresco durante tus rutas más largas.',
      image: 'Forro de asiento de bicicleta.jpg',
    },
    {
      name: 'Rin para bicicleta',
      description: 'Sumérgete en la elegancia funcional con nuestro rin de bicicleta premium. Fabricado con precisión y estilo, este rin combina a la perfección la resistencia con la ligereza, ofreciendo un rendimiento excepcional en cada pedalada. Su diseño aerodinámico no solo mejora la eficiencia, sino que también añade un toque moderno y estilizado a tu bicicleta. La construcción de aleación de alta calidad garantiza durabilidad y resistencia a los elementos, mientras que los detalles pulidos y la atención al peso hacen que este rin sea una elección ideal para los ciclistas que buscan lo mejor en términos de rendimiento y estética. Eleva tu experiencia ciclista con nuestro rin, donde la funcionalidad se encuentra con el diseño sofisticado.',
      image: 'Rin para bicicleta.jpg',
    },
  ];  

  return (
    <div style={containerStyles}>
      <div style={upperContainerStyles}>
        <div style={carouselContainerStyles}>
          <Carousel
            selectedItem={currentIndex}
            showStatus={false}
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={3000}
          >
            {products.map((product, index) => (
              <div key={index}>
                <img src={product.image} alt={product.name} style={imageStyles} />
              </div>
            ))}
          </Carousel>
          <div style={thumbnailContainerStyles}>
            {products.map((product, i) => (
              <img
                key={i}
                src={product.image}
                alt={`Thumbnail ${i + 1}`}
                style={thumbnailStyles}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>

        <div style={contentContainerStyles}>
          <div style={cardStyles}>
            <h3 style={titleStyles}>Destacado: {products[currentIndex].name}</h3>
            <p style={productNameStyles}>{products[currentIndex].name}</p>
            <p style={descriptionStyles}>{products[currentIndex].description}</p>
          </div>
        </div>
      </div>

      <div style={lowerContainerStyles}>
        <OffersSection />
        <div style={bottomTextStyles}>
          APROVECHA estas ofertas, las primeras 50 personas en comprar sus productos se llevan gratis un Mini Accesorio!!!
          </div>
          <div>
          <a href="https://wa.me/74702412" target="_blank" rel="noopener noreferrer">
            
            <img src={whatsappIcon} alt="WhatsApp" style={{ width: '10%', margin: '0 auto', marginTop: '-2%' }} />
            ¡Contáctanos en WhatsApp!
            <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', marginTop: '5%' }}></p>
          </a>
          </div>
      </div>
    </div>
  );
};

export default MyCarousel;

