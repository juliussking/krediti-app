<template>

    <SidebarMenuHeader>Menu</SidebarMenuHeader>

    <div class="sidebarItems ps-3">
        <ul>
            <RouterLink :to="{ name: 'dashboard' }">
                <li
                    class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                    <span class="material-symbols-outlined">
                        dashboard
                    </span>
                    <p>Dashboard</p>
                </li>
            </RouterLink>
            <RouterLink :to="{ name: 'clients' }">
                <li
                    class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                    <span class="material-symbols-outlined">
                        groups
                    </span>
                    <p>Clientes</p>
                </li>
            </RouterLink>
            <router-link :to="{ name: 'team' }">
                <li
                    class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                    <span class="material-symbols-outlined">
                        diversity_3
                    </span>
                    <p>Equipe</p>
                </li>
            </router-link>
            <li class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                <span class="material-symbols-outlined">
                    assignment_ind
                </span>
                <p>Cargos e permissões</p>
            </li>
            <router-link :to="{ name: 'simulator' }">
                <li
                    class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                    <span class="material-symbols-outlined">
                        calculate
                    </span>
                    <p>Simulador</p>
                </li>
            </router-link>
            <RouterLink :to="{ name: 'client-register' }">
            <li class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                <span class="material-symbols-outlined">
                    person_add
                </span>
                <p>Cadastro</p>
            </li>
            </RouterLink>
            <RouterLink :to="{ name: 'user-register' }">
            <li class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                <span class="material-symbols-outlined">
                    person_add
                </span>
                <p>Cadastro de usuário</p>
            </li>
            </RouterLink>
            <RouterLink :to="{ name: 'solicitations' }">
            <li class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                <span class="material-symbols-outlined">
                    request_page
                </span>
                <p>Solicitações</p>
            </li>
            </RouterLink>
            <li class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                <span class="material-symbols-outlined">
                    payments
                </span>
                <p>Pagamentos</p>
            </li>
            <RouterLink :to="{ name: 'company-info' }">
            <li class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                <span class="material-symbols-outlined">
                    info
                </span>
                <p>Informações</p>
            </li>
            </RouterLink>
            <RouterLink :to="{ name: 'settings' }">
                <li
                    class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-3">
                    <span class="material-symbols-outlined">
                        settings
                    </span>
                    <p>Configurações</p>
                </li>
            </RouterLink>
        </ul>
    </div>



</template>

<script setup>
import SidebarMenuHeader from './SidebarMenuHeader.vue'

</script>
