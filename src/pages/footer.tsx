import {BsTwitter,BsFacebook,BsInstagram,BsLinkedin,BsSkype } from 'react-icons/bs'

const Footer = () => {
  return (
    <>
    <div id="footer">
        <div>
            <h3>ARSHA</h3>
            <p>A108 Adam Street
                New York, NY 535022
                United States</p>
        </div>
        <div>
            <h4>Useful Links</h4>
            <a href="#home">Home</a>
            <a href="#home">About US</a>
            <a href="#home">Services</a>
            <a href="#home">Terms and Conditions</a>
            <a href="#home">Privacy Policy</a>
        </div>
        <div>
            <h4>Our Services</h4>
            <a href="#home">Web Design</a>
            <a href="#home">Web Development</a>
            <a href="#home">Product Manegement</a>
            <a href="#home">Marketing</a>
            <a href="#home">Graphic Design</a>
        </div>
        <div>
            <h4>Our Social Networks</h4>
            <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
            <BsTwitter className='footerIcon'/> <BsFacebook className='footerIcon'/> <BsInstagram className='footerIcon'/> <BsSkype className='footerIcon'/><BsLinkedin className='footerIcon'/>
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
