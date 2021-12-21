using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AssetManagementApp.Models;
using AssetManagementApp.DTOs;

namespace AssetManagementApp.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Asset, AssetDTO>().ForMember(x => x.ModelName , opt => opt.MapFrom(src => src.Model.Name))
                                        .ForMember(x => x.ColorName, opt => opt.MapFrom(src => src.Color.Name))
                                        .ForMember(x => x.ManufacturerName, opt => opt.MapFrom(src => src.ManuFacturer.Name));
            CreateMap<AssetDTO, Asset>();
        }
    }
}
