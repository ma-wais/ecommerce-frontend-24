import {BsTwitter,BsFacebook,BsInstagram,BsLinkedin } from 'react-icons/bs'

const Footer = () => {
  return (
    <>
    <div id="footer">
        <div>
            <h3>Ramie</h3>
            <p>A108 Adam Street
                New York, NY 535022
                United States</p>
        </div>
        <div>
            <h4>Useful Links</h4>
            <a href="#">Home</a>
            <a href="#">About US</a>
            <a href="#">Services</a>
            <a href="#">Terms and Conditions</a>
            <a href="#">Privacy Policy</a>
        </div>
        <div>
            <h4>Services</h4>
            <a href="">Web Design</a>
            <a href="">Web Development</a>
            <a href="">Product Manegement</a>
            <a href="">Marketing</a>
            <a href="">Graphic Design</a>
        </div>
        <div>
            <h4>Social Networks</h4>
            <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
            <BsTwitter className='footerIcon'/> <BsFacebook className='footerIcon'/> <BsInstagram className='footerIcon'/> 
            {/* <BsSkype className='footerIcon'/> */}
            <BsLinkedin className='footerIcon'/>
        </div>
        
    </div>
    <aside className='copyRight'>
        <span>© Copyright Ramie. All Rights Reserved</span>
        <span>Designed by <a href="#home">Ramie enc</a></span>
    </aside>
    </>
  )
}

export default Footer
