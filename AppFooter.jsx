import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks, TennisBallIcon } from '@/config/navigation';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export const AppFooter = ({ loggedIn }) => {
  return (
    <footer className="bg-background/95 border-t border-border/40 py-8 text-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-sm text-muted-foreground md:text-left">
            <p>&copy; {new Date().getFullYear()} VillagePoint. Tous droits réservés.</p>
            <p>Fait avec <span role="img" aria-label="tennis ball">🎾</span> par Hostinger Horizons</p>
          </div>
          <div className="flex flex-col space-y-2 md:items-center">
             <Link to={loggedIn ? "/dashboard" : "/"} className="flex items-center space-x-1 group justify-center">
                <TennisBallIcon />
                <span className="font-semibold text-lg text-primary">VillagePoint</span>
            </Link>
            <p className="text-xs text-muted-foreground">"Joue. Rencontre. Partage."</p>
          </div>
          <div className="flex flex-col space-y-2 md:items-end">
            <div className="flex space-x-3 justify-center md:justify-end">
              {footerLinks.map(link => (
                <Link key={link.to} to={link.to} className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center">
                  {link.icon && React.cloneElement(link.icon, {className: "mr-1"})}
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex space-x-3 justify-center md:justify-end mt-2">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook size={18} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Twitter size={18} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};