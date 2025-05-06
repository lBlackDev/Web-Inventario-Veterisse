import React from 'react';
import ButtonNavigation from '@/components/ButtonNavigation';
import { IconPackage, IconLayoutDashboard } from '@tabler/icons-react';

export const Navigation: React.FC = () => {

  const navigation = [
    {
      href: "/",
      text: "Dashboard",
      icon: <IconLayoutDashboard stroke={1.5} size={20}/>,
    },
    {
      href: "/productos",
      text: "Productos",
      icon: <IconPackage stroke={1.5} size={20}/>,
    },
  ]

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-box mr-2 h-6 w-6 text-teal-600">
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
            <path d="m3.3 7 8.7 5 8.7-5"></path>
            <path d="M12 22V12"></path>
          </svg>
          Inventario App
        </h2>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {
            navigation.map((item, i) => {
              return <ButtonNavigation
                key={`${i}-${item.text}-buttonLink`}
                href={item.href}
              >
                {item.icon}
                {item.text}
              </ButtonNavigation>
            })
          }
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user h-4 w-4 text-gray-600"
              ><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
              ></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div><div>
              <p className="text-sm font-medium">Admin</p><p
                className="text-xs text-gray-500"
              >
                admin@empresa.com
              </p>
            </div>
          </div><button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-full h-8 w-8"
            type="button"
            id="radix-r0"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-settings h-4 w-4"
          ><path
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          ></path><circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span className="sr-only">Opciones</span></button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;