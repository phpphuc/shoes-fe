import { toast } from 'react-toastify';
import { accountSelector } from '../../../redux/selectors';
import { accountActions } from '../../../redux/slices/accountSlide';
import { useDispatch, useSelector } from 'react-redux';

import { themeActions } from '../../../redux/slices/themeSlice';
import { themeSelector } from '../../../redux/selectors/';
import clsx from 'clsx';

function Header({ children }) {
    const dispatch = useDispatch();
    const account = useSelector(accountSelector);
    const theme = useSelector(themeSelector);   
    const handleToggleSidebar = () => {
        dispatch(themeActions.toggleSidebar());
    };
    const toggleTheme = () => {
        dispatch(themeActions.toggleTheme());
    }
    const showLogoutNoti = () => toast.info('Đã đăng xuất!');
    return (
        <header className="border-b dark:border-white/10">
            <div className="container flex h-14 items-center justify-between"><div className='flex'>
                
                        <button className='lg:hidden mr-4' onClick={handleToggleSidebar}>
                            <svg aria-hidden="true" class="h-6 w-6 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                            </svg>
                            {/* {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'} */}
                        </button>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{children}</p>
            </div>
                <div className="flex items-center space-x-3">
                    <div className="text-right">
                        <p className="font-bold">{account?.name}</p>
                        <p className="-mt-1 text-sm text-gray-600">{account?.role?.name}</p>
                    </div>
                       
                    <button type="button" class={clsx("block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500",{"hidden": theme.darkMode})} onClick={toggleTheme}>
                        <svg class="flex-shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                    </button>
                    <button type="button" class={clsx("block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500",{"hidden": !theme.darkMode})} onClick={toggleTheme}>
                    <svg class="flex-shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 8a2 2 0 1 0 4 4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                    </button>
                    
                    <button
                        className="btn btn-md btn-blue"
                        onClick={() => {
                            dispatch(accountActions.logout());
                            showLogoutNoti();
                        }}
                    >
                        <span className="pr-2">
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </span>
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
