const Partner= ({partner}) => {
    if (partner) {
        const { image, name, description, headerColor } = partner
        return (
            <>
            <img src={image} alt={name}  style={{ width: '150px',}} />
            <div className="m-4">
            <h5 className='fw-bold' style = {{ color: headerColor }}>{name}</h5>
                    {description}
                    
    
            </div>
            </>
        );
    }
    return null;
};
export default Partner