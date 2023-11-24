import { createRouter, createWebHistory } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';

const routes = [
    // Your existing routes
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home"),
        // Add meta line below
        meta: { requiresAuth: true },
    },
    {
        path: "/signin",
        name: "Signin",
        component: () => import("@/views/Signin"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    // Check if the route requires authentication by examining requiresAuth
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        try {
            // Call the Amplify Auth method to check if the user is authenticated.
            const user = await Auth.currentAuthenticatedUser();
            if (!user) {
                // Not authenticated, so redirect to signin page.
                next("/signin");
            } else {
                // They are authenticated, so we can continue.
                next();
            }
        } catch (err) {
            // Error, so redirect to signin page.
            next("/signin");
        }
    } else {
        // Route does not require authentication, so we can continue.
        next();
    }
});

// Amplify supplies a Hub that listens for events, we are interested in sign-in and sign-out events
Hub.listen("auth", async (data) => {
    if (data.payload.event === 'signOut'){
        router.push({path: '/signin'});
    } else if (data.payload.event === 'signIn') {
        router.push({path: '/'});
    }
});
export default router;
