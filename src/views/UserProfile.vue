<template>
  <div class="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white rounded-xl shadow-md p-8">
      
      <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <img
            class="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow"
            :src="user.avatar"
            alt="Avatar"
          />
        </div>

        <!-- Info -->
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-800">{{ user.name }}</h2>
          <p class="text-gray-500 mb-4">{{ user.role }}</p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p class="font-semibold">Email:</p>
              <p>{{ user.email }}</p>
            </div>
            <div>
              <p class="font-semibold">Telefone:</p>
              <p>{{ user.phone }}</p>
            </div>
            <div>
              <p class="font-semibold">Cadastrado em:</p>
              <p>{{ user.created_at }}</p>
            </div>
            <div>
              <p class="font-semibold">Status:</p>
              <p :class="user.active ? 'text-green-600' : 'text-red-600'">
                {{ user.active ? 'Ativo' : 'Inativo' }}
              </p>
            </div>
          </div>

          <div class="mt-6">
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
const user = {
  name: 'Julio Fernandes',
  email: 'julio@email.com',
  phone: '(11) 98765-4321',
  role: 'Administrador',
  avatar: 'https://i.pravatar.cc/300?img=5',
  created_at: '13/06/2025',
  active: true,
}
</script>
