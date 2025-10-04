<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

      <h2 class="text-5xl font-bold text-center text-gray-800">Krediti</h2>

      <div 
        class="w-full bg-red-600 border border-red-500 px-4 py-3 rounded mb-5 mt-2">
        <h3 class="text-white text-center">Houve um erro ao concluir sua assinatura! 
        </h3>

      </div>
      <div 
      class="text-center">
        <p class="mt-4 text-sm text-center text-gray-600"><RouterLink :to="{ name: 'plans' }" class="text-blue-500 hover:underline">Tentar novamente
          </RouterLink>
        </p>
      </div>


    </div>
  </div>
</template>
