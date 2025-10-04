<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

      <h2 class="text-5xl font-bold text-center text-gray-800">Krediti</h2>

      <div 
        class="w-full bg-green-600 border border-green-500 px-4 py-3 rounded mb-5 mt-2">
        <h3 class="text-white text-center">Assinatura bem sucedida!
        </h3>

      </div>
      <div 
      class="text-center">
        <p class="mt-4 text-sm text-center text-gray-600">
          <RouterLink :to="{ name: 'dashboard' }" class="text-blue-500 hover:underline">Entrar
          </RouterLink>
        </p>
      </div>


    </div>
  </div>
</template>
