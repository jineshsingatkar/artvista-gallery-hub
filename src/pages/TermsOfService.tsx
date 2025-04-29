
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Last Updated: April 29, 2025
            </p>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="section">
          <div className="container-custom">
            <div className="prose dark:prose-invert max-w-none">
              <h2>Introduction</h2>
              <p>
                These terms and conditions outline the rules and regulations for the use of ArtVista's website.
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue 
                to use ArtVista's website if you do not accept all of the terms and conditions stated on this page.
              </p>
              
              <h2>License</h2>
              <p>
                Unless otherwise stated, ArtVista and/or its licensors own the intellectual property rights for all material on ArtVista.
                All intellectual property rights are reserved. You may view and/or print pages from https://artvista.com for your own personal use 
                subject to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul>
                <li>Republish material from https://artvista.com</li>
                <li>Sell, rent or sub-license material from https://artvista.com</li>
                <li>Reproduce, duplicate or copy material from https://artvista.com</li>
                <li>Redistribute content from ArtVista (unless content is specifically made for redistribution)</li>
              </ul>
              
              <h2>User Comments</h2>
              <p>
                Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data. 
                ArtVista does not screen, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views or 
                opinions of ArtVista, its agents or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion.
              </p>
              <p>
                You hereby grant ArtVista a non-exclusive royalty-free license to use, reproduce, edit and authorize others to use, reproduce and edit any of your 
                Comments in all forms, formats or media.
              </p>
              
              <h2>Content Liability</h2>
              <p>
                We shall have no responsibility or liability for any content appearing on your website. You agree to indemnify and defend us against all claims 
                arising out of or based upon your Website. No link(s) may appear on any page on your website or within any context containing content or materials 
                that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation 
                of, any third party rights.
              </p>
              
              <h2>Reservation of Rights</h2>
              <p>
                We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our website. 
                You agree to immediately remove all links to our website upon such request. We also reserve the right to amend these terms of service and its 
                linking policy at any time. By continuing to link to our website, you agree to be bound to and abide by these linking terms and conditions.
              </p>
              
              <h2>Removal of Links from Our Website</h2>
              <p>
                If you find any link on our website or any linked website objectionable for any reason, you may contact us about this. 
                We will consider requests to remove links but will have no obligation to do so or to respond directly to you.
              </p>
              
              <h2>Disclaimer</h2>
              <p>
                To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the 
                use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose 
                and/or the use of reasonable care and skill).
              </p>
              
              <h2>Contact Information</h2>
              <p>
                If you have any queries regarding any of our terms, please contact us at:
              </p>
              <p>
                ArtVista<br />
                Deccan Gymkhana, Pune, MH<br />
                Email: info@artvista.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
