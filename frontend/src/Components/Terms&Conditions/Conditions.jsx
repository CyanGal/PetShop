import React from 'react'
import Card from 'react-bootstrap/Card';
import "./Conditions.css";

const Conditions = () => {

    return (
  
      <Card className='conditionscard'>

      <Card.Header className='conditions-header'>Terms & Conditions</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
  
          <p className='conditions-text'>
            {' '}
            
            <h6>I. Identification and Contact Information</h6>

This website/application is operated by Purrfect Pets. Our principal place of business is located at street Bulevardi Zogu i I, Tirane, Albania. You can contact us by writing to the business address given above, by using our website contact form, by email to purrfectpets32@gmail.com , or by telephone on +44 567 4677.

 

<h6>II. Description of Products/Services</h6>

Purrfect Pets provides a variety of pet-related products and services to enhance the well-being of your furry friends.

 

<h6>III. Limitation of Liability</h6>

Purrfect Pets shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with the use of our services or the website content.

 

<h6>IV. User Accounts and Content Restrictions</h6>

Users are prohibited from posting or transmitting through the Purrfect Pets site any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, discriminatory, or otherwise objectionable material related to pets or the use of our services.

 

<h6>V. Order Placement, Pricing, Payment Methods, and Cancellation</h6>

Purchasers must be at least 18 years old. We reserve the right to refuse service to anyone for any reason at any time. Our services are not available in jurisdictions where it is prohibited by law.

 

Upon placing an order, customers will receive a confirmation email detailing the products ordered and the total cost. Purrfect Pets reserves the right to cancel an order at any time prior to dispatch, in the event of any unforeseen circumstances.

 

We accept the following methods of payment:  Visa, MasterCard, American Express, and PayPal.

 

All prices are subject to change without notice and are exclusive of any applicable taxes.

 

Products purchased from Purrfect Pets will be dispatched within three business days of the order and delivered within 5-7 business days. We deliver to Albania, Kosovo and North Macedonia.

 

Customers may cancel their order within 24 hours of placing it, provided that the order has not yet been dispatched.

 

<h6>VI. Warranty/Guarantee Information</h6>

All products offered by Purrfect Pets come with a standard 12-month warranty covering defects in material, workmanship, etc.

 

<h6>VII. Safety Information and Instructions for Use</h6>

Our pet products must be used in accordance with the provided instructions and guidelines. Failure to do so can result in injury. Always ensure that the product is suitable for your pet and follow recommended usage guidelines.

 

By using the Purrfect Pets website/application, you agree to abide by these Terms and Conditions. Your continued use of the website/application after changes have been posted means you agree to be legally bound by these terms as updated and/or amended.

            {' '}
          </p>
          <footer className="blockquote-footer">
          Date of last update: <cite title="Source Title">December 2023</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
   ) 
  }
 
  export default Conditions