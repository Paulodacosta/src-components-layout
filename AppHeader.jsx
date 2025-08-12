import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCircle, Bell, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TennisBallIcon, loggedInNavItems, guestNavItems, adminNavItem } from '@/config/navigation';

const NavItem = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to) && to !== "/dashboard" && location.pathname !== "/");
  const isHomeActive = (location.pathname === "/" && to === "/") || (location.pathname === "/dashboard" && to === "/dashboard");

  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 ${(isActive || isHomeActive) ? 'bg-primary/10 dark:bg-primary/20 text-primary font-semibold' : 'text-foreground/70 hover:text-foreground'}`}
      >
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </motion.div>
    </Link>
  );
};

const MobileNavItem = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to) && to !== "/dashboard" && location.pathname !== "/");
  const isHomeActive = (location.pathname === "/" && to === "/") || (location.pathname === "/dashboard" && to === "/dashboard");


  return (
    <Link to={to} onClick={onClick} className="w-full">
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 ${(isActive || isHomeActive) ? 'bg-primary/10 dark:bg-primary/20 text-primary font-semibold' : 'text-foreground/70 hover:text-foreground'}`}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </motion.div>
    </Link>
  );
};

export const AppHeader = ({ loggedIn, isAdmin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navItemsToDisplay = loggedIn ? loggedInNavItems : guestNavItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link to={loggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
          <TennisBallIcon />
          <span className="font-bold text-2xl text-primary tracking-tight">VillagePoint</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItemsToDisplay.map(item => <NavItem key={item.to} {...item} />)}
          {loggedIn && isAdmin && <NavItem {...adminNavItem} />}
        </nav>

        <div className="flex items-center space-x-2">
          {loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-primary">
                    <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces" alt="User Avatar" />
                    <AvatarFallback>VP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">TennisFan23</p>
                    <p className="text-xs leading-none text-muted-foreground">tennis.fan23@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profil" className="flex items-center w-full">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Mon Profil
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link to="/notifications" className="flex items-center w-full">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/parametres" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                     Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    localStorage.removeItem('userLoggedIn');
                    window.location.href = '/connexion'; 
                }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/connexion">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Se Connecter
              </Button>
            </Link>
          )}

          <div className="md:hidden">
            <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <nav className="flex flex-col items-start p-4 space-y-2">
              {navItemsToDisplay.map(item => <MobileNavItem key={item.to} {...item} onClick={() => setIsMobileMenuOpen(false)} />)}
              {loggedIn && isAdmin && <MobileNavItem {...adminNavItem} onClick={() => setIsMobileMenuOpen(false)} />}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};