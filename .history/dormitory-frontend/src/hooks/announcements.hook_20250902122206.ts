import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/lib/api.api';
import { Announcement, AnnouncementFilters } from '@/types/announcements.types';

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export const useAnnouncements = () => {
  const queryClient = useQueryClient();

  // Get announcements with pagination and filters
  const getAnnouncements = (filters: AnnouncementFilters) => {
    const { showHidden, showExpired, page = 1, limit = 10 } = filters;
    
    return useQuery({
      queryKey: ['announcements', { showHidden, showExpired, page, limit }],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (showHidden !== undefined) params.append('showHidden', showHidden.toString());
        if (showExpired !== undefined) params.append('showExpired', showExpired.toString());
        
        const response = await api.get<PaginatedResponse<Announcement>>(`/announcements?${params.toString()}`);
        
        // If the API doesn't return the expected structure, normalize it here
        if (!response.data.pagination) {
          return {
            data: Array.isArray(response.data) ? response.data : [],
            pagination: {
              totalItems: Array.isArray(response.data) ? response.data.length : 0,
              totalPages: 1,
              currentPage: 1,
              itemsPerPage: limit
            }
          };
        }
        
        return response.data;
      },
      // Refetch data every 30 seconds to catch new announcements
      refetchInterval: 30000,
      // Keep previous data while loading new data
      keepPreviousData: true,
    });
  };

  // Create a new announcement
  const createAnnouncement = useMutation({
    mutationFn: (data: Partial<Announcement>) => api.post('/announcements', data),
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });

  // Update an announcement
  const updateAnnouncement = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Announcement> }) => 
      api.patch(`/announcements/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcement', variables.id] });
    }
  });

  // Delete an announcement
  const deleteAnnouncement = useMutation({
    mutationFn: (id: string) => api.delete(`/announcements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });

  // Get a single announcement by ID
  const getAnnouncementById = (id: string) => {
    return useQuery({
      queryKey: ['announcement', id],
      queryFn: () => api.get<Announcement>(`/announcements/${id}`).then(res => res.data),
      enabled: !!id,
    });
  };

  return {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncementById,
  };
};