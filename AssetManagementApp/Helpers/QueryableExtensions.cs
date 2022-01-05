﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AssetManagementApp.DTOs;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementApp.Helpers
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginationDTO pagination)
        {
            return queryable
                .Skip((pagination.Page - 1) * pagination.RecordsPerPage)
                .Take(pagination.RecordsPerPage);
        }
    }
}
