import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from '../axios';

// Custom base query using axios
const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'GET', data, params }) => {
    try {
      const result = await axios({
        url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// Create API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    'Course',
    'CallForInnovation',
    'Career',
    'Incubation',
    'IncubationCategory',
    'Collaboration',
    'Proposal',
    'Fellowship',
    'OngoingProject',
    'News',
    'Newsletter',
    'Workshop',
    'Tender',
    'Visit',
    'Infrastructure',
    'ProcurementPolicy',
    'AuditReport',
    'SkillDevelopment',
  ],
  endpoints: (builder) => ({
    // Courses
    getCourses: builder.query({
      query: (params = {}) => ({
        url: '/courses',
        params,
      }),
      providesTags: ['Course'],
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: '/courses',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Course', id }],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),

    // Call for Innovation
    getCallForInnovations: builder.query({
      query: (params = {}) => ({
        url: '/call-for-innovation',
        params,
      }),
      providesTags: ['CallForInnovation'],
    }),
    getCallForInnovation: builder.query({
      query: (id) => `/call-for-innovation/${id}`,
      providesTags: (result, error, id) => [{ type: 'CallForInnovation', id }],
    }),
    createCallForInnovation: builder.mutation({
      query: (data) => ({
        url: '/call-for-innovation',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CallForInnovation'],
    }),
    updateCallForInnovation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/call-for-innovation/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'CallForInnovation', id }],
    }),
    deleteCallForInnovation: builder.mutation({
      query: (id) => ({
        url: `/call-for-innovation/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CallForInnovation'],
    }),

    // Careers
    getCareers: builder.query({
      query: (params = {}) => ({
        url: '/careers',
        params,
      }),
      providesTags: ['Career'],
    }),
    getCareer: builder.query({
      query: (id) => `/careers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Career', id }],
    }),
    createCareer: builder.mutation({
      query: (data) => ({
        url: '/careers',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Career'],
    }),
    updateCareer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/careers/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Career', id }],
    }),
    deleteCareer: builder.mutation({
      query: (id) => ({
        url: `/careers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Career'],
    }),

    // Incubation
    getStartups: builder.query({
      query: (params = {}) => ({
        url: '/incubation/startups',
        params,
      }),
      providesTags: ['Incubation'],
    }),
    getStartup: builder.query({
      query: (id) => `/incubation/startups/${id}`,
      providesTags: (result, error, id) => [{ type: 'Incubation', id }],
    }),
    createStartup: builder.mutation({
      query: (data) => ({
        url: '/incubation/startups',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Incubation'],
    }),
    updateStartup: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/incubation/startups/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Incubation', id }],
    }),
    deleteStartup: builder.mutation({
      query: (id) => ({
        url: `/incubation/startups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Incubation'],
    }),
    getCategories: builder.query({
      query: () => '/incubation/categories',
      providesTags: ['IncubationCategory'],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/incubation/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['IncubationCategory'],
    }),
    deleteCategory: builder.mutation({
      query: (name) => ({
        url: `/incubation/categories/${name}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['IncubationCategory'],
    }),

    // Collaborations
    getCollaborations: builder.query({
      query: (params = {}) => ({
        url: '/collaborations',
        params,
      }),
      providesTags: ['Collaboration'],
    }),
    getCollaboration: builder.query({
      query: (id) => `/collaborations/${id}`,
      providesTags: (result, error, id) => [{ type: 'Collaboration', id }],
    }),
    createCollaboration: builder.mutation({
      query: (data) => ({
        url: '/collaborations',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Collaboration'],
    }),
    updateCollaboration: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/collaborations/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Collaboration', id }],
    }),
    deleteCollaboration: builder.mutation({
      query: (id) => ({
        url: `/collaborations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collaboration'],
    }),

    // Projects - Proposals
    getProposals: builder.query({
      query: (params = {}) => ({
        url: '/projects/proposals',
        params,
      }),
      providesTags: ['Proposal'],
    }),
    getProposal: builder.query({
      query: (id) => `/projects/proposals/${id}`,
      providesTags: (result, error, id) => [{ type: 'Proposal', id }],
    }),
    createProposal: builder.mutation({
      query: (data) => ({
        url: '/projects/proposals',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Proposal'],
    }),
    updateProposal: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/projects/proposals/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Proposal', id }],
    }),
    deleteProposal: builder.mutation({
      query: (id) => ({
        url: `/projects/proposals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Proposal'],
    }),

    // Projects - Fellowships
    getFellowships: builder.query({
      query: (params = {}) => ({
        url: '/projects/fellowships',
        params,
      }),
      providesTags: ['Fellowship'],
    }),
    getFellowship: builder.query({
      query: (id) => `/projects/fellowships/${id}`,
      providesTags: (result, error, id) => [{ type: 'Fellowship', id }],
    }),
    createFellowship: builder.mutation({
      query: (data) => ({
        url: '/projects/fellowships',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Fellowship'],
    }),
    updateFellowship: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/projects/fellowships/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Fellowship', id }],
    }),
    deleteFellowship: builder.mutation({
      query: (id) => ({
        url: `/projects/fellowships/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fellowship'],
    }),

    // Projects - Ongoing Projects
    getOngoingProjects: builder.query({
      query: (params = {}) => ({
        url: '/projects/ongoing',
        params,
      }),
      providesTags: ['OngoingProject'],
    }),
    getOngoingProject: builder.query({
      query: (id) => `/projects/ongoing/${id}`,
      providesTags: (result, error, id) => [{ type: 'OngoingProject', id }],
    }),
    createOngoingProject: builder.mutation({
      query: (data) => ({
        url: '/projects/ongoing',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OngoingProject'],
    }),
    updateOngoingProject: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/projects/ongoing/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'OngoingProject', id }],
    }),
    deleteOngoingProject: builder.mutation({
      query: (id) => ({
        url: `/projects/ongoing/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OngoingProject'],
    }),

    // News
    getNews: builder.query({
      query: (params = {}) => ({
        url: '/news',
        params,
      }),
      providesTags: ['News'],
    }),
    getNewsItem: builder.query({
      query: (id) => `/news/${id}`,
      providesTags: (result, error, id) => [{ type: 'News', id }],
    }),
    createNews: builder.mutation({
      query: (data) => ({
        url: '/news',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['News'],
    }),
    updateNews: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/news/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'News', id }],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['News'],
    }),

    // Newsletter
    getNewsletters: builder.query({
      query: (params = {}) => ({
        url: '/newsletter',
        params,
      }),
      providesTags: ['Newsletter'],
    }),
    getNewsletter: builder.query({
      query: (id) => `/newsletter/${id}`,
      providesTags: (result, error, id) => [{ type: 'Newsletter', id }],
    }),
    createNewsletter: builder.mutation({
      query: (data) => ({
        url: '/newsletter',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Newsletter'],
    }),
    updateNewsletter: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/newsletter/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Newsletter', id }],
    }),
    deleteNewsletter: builder.mutation({
      query: (id) => ({
        url: `/newsletter/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Newsletter'],
    }),

    // Workshops
    getWorkshops: builder.query({
      query: (params = {}) => ({
        url: '/workshops',
        params,
      }),
      providesTags: ['Workshop'],
    }),
    getWorkshop: builder.query({
      query: (id) => `/workshops/${id}`,
      providesTags: (result, error, id) => [{ type: 'Workshop', id }],
    }),
    createWorkshop: builder.mutation({
      query: (data) => ({
        url: '/workshops',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Workshop'],
    }),
    updateWorkshop: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/workshops/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Workshop', id }],
    }),
    deleteWorkshop: builder.mutation({
      query: (id) => ({
        url: `/workshops/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Workshop'],
    }),

    // Tenders
    getTenders: builder.query({
      query: (params = {}) => ({
        url: '/tenders',
        params,
      }),
      providesTags: ['Tender'],
    }),
    getTender: builder.query({
      query: (id) => `/tenders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tender', id }],
    }),
    createTender: builder.mutation({
      query: (data) => ({
        url: '/tenders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tender'],
    }),
    updateTender: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/tenders/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tender', id }],
    }),
    deleteTender: builder.mutation({
      query: (id) => ({
        url: `/tenders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tender'],
    }),

    // Visits
    getVisits: builder.query({
      query: (params = {}) => ({
        url: '/visits',
        params,
      }),
      providesTags: ['Visit'],
    }),
    getVisit: builder.query({
      query: (id) => `/visits/${id}`,
      providesTags: (result, error, id) => [{ type: 'Visit', id }],
    }),
    createVisit: builder.mutation({
      query: (data) => ({
        url: '/visits',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Visit'],
    }),
    updateVisit: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/visits/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Visit', id }],
    }),
    deleteVisit: builder.mutation({
      query: (id) => ({
        url: `/visits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Visit'],
    }),

    // Infrastructure
    getInfrastructure: builder.query({
      query: (params = {}) => ({
        url: '/infrastructure',
        params,
      }),
      providesTags: ['Infrastructure'],
    }),
    getInfrastructureItem: builder.query({
      query: (id) => `/infrastructure/${id}`,
      providesTags: (result, error, id) => [{ type: 'Infrastructure', id }],
    }),
    createInfrastructure: builder.mutation({
      query: (data) => ({
        url: '/infrastructure',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Infrastructure'],
    }),
    updateInfrastructure: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/infrastructure/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Infrastructure', id }],
    }),
    deleteInfrastructure: builder.mutation({
      query: (id) => ({
        url: `/infrastructure/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Infrastructure'],
    }),

    // Procurement Policy
    getProcurementPolicies: builder.query({
      query: (params = {}) => ({
        url: '/procurement-policy',
        params,
      }),
      providesTags: ['ProcurementPolicy'],
    }),
    getProcurementPolicy: builder.query({
      query: (id) => `/procurement-policy/${id}`,
      providesTags: (result, error, id) => [{ type: 'ProcurementPolicy', id }],
    }),
    createProcurementPolicy: builder.mutation({
      query: (data) => ({
        url: '/procurement-policy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ProcurementPolicy'],
    }),
    updateProcurementPolicy: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/procurement-policy/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'ProcurementPolicy', id }],
    }),
    deleteProcurementPolicy: builder.mutation({
      query: (id) => ({
        url: `/procurement-policy/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProcurementPolicy'],
    }),

    // Audit Reports
    getAuditReports: builder.query({
      query: (params = {}) => ({
        url: '/audit-reports',
        params,
      }),
      providesTags: ['AuditReport'],
    }),
    getAuditReport: builder.query({
      query: (id) => `/audit-reports/${id}`,
      providesTags: (result, error, id) => [{ type: 'AuditReport', id }],
    }),
    createAuditReport: builder.mutation({
      query: (data) => ({
        url: '/audit-reports',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AuditReport'],
    }),
    updateAuditReport: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/audit-reports/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'AuditReport', id }],
    }),
    deleteAuditReport: builder.mutation({
      query: (id) => ({
        url: `/audit-reports/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AuditReport'],
    }),

    // Skill Development
    getSkillDevelopment: builder.query({
      query: (params = {}) => ({
        url: '/skill-development',
        params,
      }),
      providesTags: ['SkillDevelopment'],
    }),
    getSkillDevelopmentItem: builder.query({
      query: (id) => `/skill-development/${id}`,
      providesTags: (result, error, id) => [{ type: 'SkillDevelopment', id }],
    }),
    createSkillDevelopment: builder.mutation({
      query: (data) => ({
        url: '/skill-development',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SkillDevelopment'],
    }),
    updateSkillDevelopment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/skill-development/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'SkillDevelopment', id }],
    }),
    deleteSkillDevelopment: builder.mutation({
      query: (id) => ({
        url: `/skill-development/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SkillDevelopment'],
    }),
  }),
});

export const {
  // Courses
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  // Call for Innovation
  useGetCallForInnovationsQuery,
  useGetCallForInnovationQuery,
  useCreateCallForInnovationMutation,
  useUpdateCallForInnovationMutation,
  useDeleteCallForInnovationMutation,
  // Careers
  useGetCareersQuery,
  useGetCareerQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
  // Incubation
  useGetStartupsQuery,
  useGetStartupQuery,
  useCreateStartupMutation,
  useUpdateStartupMutation,
  useDeleteStartupMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  // Collaborations
  useGetCollaborationsQuery,
  useGetCollaborationQuery,
  useCreateCollaborationMutation,
  useUpdateCollaborationMutation,
  useDeleteCollaborationMutation,
  // Projects
  useGetProposalsQuery,
  useGetProposalQuery,
  useCreateProposalMutation,
  useUpdateProposalMutation,
  useDeleteProposalMutation,
  useGetFellowshipsQuery,
  useGetFellowshipQuery,
  useCreateFellowshipMutation,
  useUpdateFellowshipMutation,
  useDeleteFellowshipMutation,
  useGetOngoingProjectsQuery,
  useGetOngoingProjectQuery,
  useCreateOngoingProjectMutation,
  useUpdateOngoingProjectMutation,
  useDeleteOngoingProjectMutation,
  // News
  useGetNewsQuery,
  useGetNewsItemQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  // Newsletter
  useGetNewslettersQuery,
  useGetNewsletterQuery,
  useCreateNewsletterMutation,
  useUpdateNewsletterMutation,
  useDeleteNewsletterMutation,
  // Workshops
  useGetWorkshopsQuery,
  useGetWorkshopQuery,
  useCreateWorkshopMutation,
  useUpdateWorkshopMutation,
  useDeleteWorkshopMutation,
  // Tenders
  useGetTendersQuery,
  useGetTenderQuery,
  useCreateTenderMutation,
  useUpdateTenderMutation,
  useDeleteTenderMutation,
  // Visits
  useGetVisitsQuery,
  useGetVisitQuery,
  useCreateVisitMutation,
  useUpdateVisitMutation,
  useDeleteVisitMutation,
  // Infrastructure
  useGetInfrastructureQuery,
  useGetInfrastructureItemQuery,
  useCreateInfrastructureMutation,
  useUpdateInfrastructureMutation,
  useDeleteInfrastructureMutation,
  // Procurement Policy
  useGetProcurementPoliciesQuery,
  useGetProcurementPolicyQuery,
  useCreateProcurementPolicyMutation,
  useUpdateProcurementPolicyMutation,
  useDeleteProcurementPolicyMutation,
  // Audit Reports
  useGetAuditReportsQuery,
  useGetAuditReportQuery,
  useCreateAuditReportMutation,
  useUpdateAuditReportMutation,
  useDeleteAuditReportMutation,
  // Skill Development
  useGetSkillDevelopmentQuery,
  useGetSkillDevelopmentItemQuery,
  useCreateSkillDevelopmentMutation,
  useUpdateSkillDevelopmentMutation,
  useDeleteSkillDevelopmentMutation,
} = apiSlice;

export default apiSlice;

