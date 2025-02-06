// 'use client'

// import React, { useState,useCallback,useEffect } from 'react'
// import axios from 'axios'
// import { debounce } from 'lodash'
// import { useQuery } from '@tanstack/react-query'
// import {Volunteer} from '@/lib/store/features/volunteers'


// const fetchsearchedvolunteers=async(query:string):Promise<Volunteer[]>=>{
//     const response=await axios.get('/admin/searchvolunteer',{
//         params:{query}
//     })
//     return response.data
// }

// const Searchbar = () => {
//     const [searchQuery, setSearchQuery] = useState<string>('')
//     const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  
//     // Debounced function to update `debouncedQuery`
//     const debouncedSetSearchQuery = useCallback(
//         debounce((query: string) => {
//           setDebouncedQuery(query) 
//         }, 500),
//         []
//       )
    
//     useEffect(() => {
//       debouncedSetSearchQuery(searchQuery)
//     }, [searchQuery, debouncedSetSearchQuery])
  
    
//     const { data: volunteers, isLoading, error } = useQuery<Volunteer[], Error>(
//         ['volunteers', debouncedQuery], 
//         async () => await fetchsearchedvolunteers(debouncedQuery), // Ensure async function
//         {
//           enabled: !!debouncedQuery,
//           refetchOnWindowFocus: false,
//           staleTime: 60000,
//         }
//       )
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Searchbar
