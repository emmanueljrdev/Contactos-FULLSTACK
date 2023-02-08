
const body = document.querySelector('body');

// buscar que pag esta
// console.log(window.location.pathname);


const createNav = () => {
    const nav = document.createElement('nav');
    nav.id = 'nav-bar';
    nav.classList.add('bg-zinc-50', 'dark:bg-slate-800', 'h-20', 'fixed', 'top-0', 'left-0', 'right-0');
    nav.innerHTML = `
    <div class="flex justify-between items-center h-full px-4">
    <h1 class="text-zinc-700 dark:text-white text-xl uppercase font-bold"><a href="/">Contact App</a></h1>

    <!-- Desktop layout -->
    <div class=" hidden md:flex gap-4 p-4">
        <a href="/signup/" class="hover:bg-slate-100 hover:dark:bg-slate-700 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Registro</a>
        <a href="/login/" class="hover:bg-slate-100 hover:dark:bg-slate-700 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Login</a>
    </div>

    <!-- Mobile layout -->
    <!-- Btn mobile -->
    <svg id="nav-btn" class="md:hidden text-zinc-700 w-8 h-8 dark:text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    
      <!-- Sidebar mobile -->
      <div id="nav-sidebar" class="md:hidden fixed top-20 w-[0%] -right-8 bottom-0 bg-zinc-500/70 dark:bg-slate-900/60 backdrop-blur-sm easy-in duration-500">
        <div class="absolute bg-zinc-100 w-[60%] right-0 dark:bg-slate-700 top-0 bottom-0 flex flex-col gap-4 p-4">
            <a href="/signup/" class="hover:bg-slate-200 hover:dark:bg-slate-600 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Registro</a>
            <a href="/login/" class="hover:bg-slate-200 hover:dark:bg-slate-600 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Login</a>

        </div>
      </div>
</div>
    
    `;
    const navBtn = nav.children[0].children[2];
    const navSidebar = nav.children[0].children[3];
    // console.log(navBtn, navSidebar);
    navBtn.addEventListener('click', e => {
        if(navSidebar.classList.contains('w-[0%]')){
            navSidebar.classList.remove('w-[0%]', '-right-8');
            navSidebar.classList.add('w-full', 'right-0');
        } else{
            navSidebar.classList.add('w-[0%]', '-right-8');
            navSidebar.classList.remove('w-full', 'right-0');
        }
    });
    body.append(nav);
};

const createNavSignup = () => {
    const nav = document.createElement('nav');
    nav.id = 'nav-bar';
    nav.classList.add('bg-zinc-50', 'dark:bg-slate-800', 'h-20', 'fixed', 'top-0', 'left-0', 'right-0');
    nav.innerHTML = `
    <div class="flex justify-between items-center h-full px-4">
    <h1 class="text-zinc-700 dark:text-white text-xl uppercase font-bold"><a href="/">Contact App</a></h1>

    <!-- Desktop layout -->
    <div class=" hidden md:flex gap-4 p-4">
        <a href="/login/" class="hover:bg-slate-100 hover:dark:bg-slate-700 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Login</a>
    </div>

    <!-- Mobile layout -->
    <!-- Btn mobile -->
    <svg id="nav-btn" class="md:hidden text-zinc-700 w-8 h-8 dark:text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    
      <!-- Sidebar mobile -->
      <div id="nav-sidebar" class="md:hidden fixed top-20 w-[0%] -right-8 bottom-0 bg-zinc-500/70 dark:bg-slate-900/60 backdrop-blur-sm easy-in duration-500">
        <div class="absolute bg-zinc-100 w-[60%] right-0 dark:bg-slate-700 top-0 bottom-0 flex flex-col gap-4 p-4">
            <a href="/login/" class="hover:bg-slate-200 hover:dark:bg-slate-600 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Login</a>

        </div>
      </div>
</div>
    
    `;
    const navBtn = nav.children[0].children[2];
    const navSidebar = nav.children[0].children[3];
    // console.log(navBtn, navSidebar);
    navBtn.addEventListener('click', e => {
        if(navSidebar.classList.contains('w-[0%]')){
            navSidebar.classList.remove('w-[0%]', '-right-8');
            navSidebar.classList.add('w-full', 'right-0');
        } else{
            navSidebar.classList.add('w-[0%]', '-right-8');
            navSidebar.classList.remove('w-full', 'right-0');
        }
    });
    body.append(nav);
};

const createNavLogin = () => {
    const nav = document.createElement('nav');
    nav.id = 'nav-bar';
    nav.classList.add('bg-zinc-50', 'dark:bg-slate-800', 'h-20', 'fixed', 'top-0', 'left-0', 'right-0');
    nav.innerHTML = `
    <div class="flex justify-between items-center h-full px-4">
    <h1 class="text-zinc-700 dark:text-white text-xl uppercase font-bold"><a href="/">Contact App</a></h1>

    <!-- Desktop layout -->
    <div class=" hidden md:flex gap-4 p-4">
        <a href="/signup/" class="hover:bg-slate-100 hover:dark:bg-slate-700 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Registro</a>
    </div>

    <!-- Mobile layout -->
    <!-- Btn mobile -->
    <svg id="nav-btn" class="md:hidden text-zinc-700 w-8 h-8 dark:text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    
      <!-- Sidebar mobile -->
      <div id="nav-sidebar" class="md:hidden fixed top-20 w-[0%] -right-8 bottom-0 bg-zinc-500/70 dark:bg-slate-900/60 backdrop-blur-sm easy-in duration-500">
        <div class="absolute bg-zinc-100 w-[60%] right-0 dark:bg-slate-700 top-0 bottom-0 flex flex-col gap-4 p-4">
            <a href="/signup/" class="hover:bg-slate-200 hover:dark:bg-slate-600 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Registro</a>

        </div>
      </div>
</div>
    
    `;
    const navBtn = nav.children[0].children[2];
    const navSidebar = nav.children[0].children[3];
    // console.log(navBtn, navSidebar);
    navBtn.addEventListener('click', e => {
        if(navSidebar.classList.contains('w-[0%]')){
            navSidebar.classList.remove('w-[0%]', '-right-8');
            navSidebar.classList.add('w-full', 'right-0');
        } else{
            navSidebar.classList.add('w-[0%]', '-right-8');
            navSidebar.classList.remove('w-full', 'right-0');
        }
    });
    body.append(nav);
};

const createNavApp = () => {
    const nav = document.createElement('nav');
    nav.id = 'nav-bar';
    nav.classList.add('bg-zinc-50', 'dark:bg-slate-800', 'h-20', 'fixed', 'top-0', 'left-0', 'right-0');
    nav.innerHTML = `
    <div class="flex justify-between items-center h-full px-4">
    <h1 class="text-zinc-700 dark:text-white text-xl uppercase font-bold"><a href="/">Contact App</a></h1>

    <!-- Desktop layout -->
    <div class=" hidden md:flex gap-4 p-4">
        <button class="hover:bg-slate-100 hover:dark:bg-slate-700 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Log Out</button>
    </div>

    <!-- Mobile layout -->
    <!-- Btn mobile -->
    <svg id="nav-btn" class="md:hidden text-zinc-700 w-8 h-8 dark:text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    
      <!-- Sidebar mobile -->
      <div id="nav-sidebar" class="md:hidden fixed top-20 w-[0%] -right-8 bottom-0 bg-zinc-500/70 dark:bg-slate-900/60 backdrop-blur-sm easy-in duration-500">
        <div class="absolute bg-zinc-100 w-[60%] right-0 dark:bg-slate-700 top-0 bottom-0 flex flex-col gap-4 p-4">
            <button class="hover:bg-slate-200 hover:dark:bg-slate-600 rounded-lg p-2 font-semibold dark:text-white text-zinc-700 easy-in duration-300">Log Out<button>

        </div>
      </div>
</div>
    
    `;

    // crear eventos para que el log out funcione en escritorio
    const desktopLogOut = nav.children[0].children[1].children[0];
    desktopLogOut.addEventListener('click', async e =>{
        await axios.get('/api/logout');
        window.location.pathname = '/';
    });

    // crear eventos para que el log out funcione en telefonos
    const mobileLogOut = nav.children[0].children[3].children[0].children[0];
    mobileLogOut.addEventListener('click', async e =>{
        await axios.get('/api/logout');
        window.location.pathname = '/';
    });



    const navBtn = nav.children[0].children[2];
    const navSidebar = nav.children[0].children[3];
    // console.log(navBtn, navSidebar);
    navBtn.addEventListener('click', e => {
        if(navSidebar.classList.contains('w-[0%]')){
            navSidebar.classList.remove('w-[0%]', '-right-8');
            navSidebar.classList.add('w-full', 'right-0');
        } else{
            navSidebar.classList.add('w-[0%]', '-right-8');
            navSidebar.classList.remove('w-full', 'right-0');
        }
    });
    body.append(nav);
};

if (window.location.pathname === '/') {
    createNav();
} else if (window.location.pathname === '/signup/'){
    createNavSignup();
} else if (window.location.pathname === '/login/'){
    createNavLogin();
} else if (window.location.pathname.includes('/app/') ){
    createNavApp();
}