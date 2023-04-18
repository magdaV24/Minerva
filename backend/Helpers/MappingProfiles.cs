using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<MultiCardsDTO, MultiCard>();
            CreateMap<FlipCardDTO, FlipCard>();
            CreateMap<EditFlipCardDTO, FlipCard>();
            CreateMap<EditMultiCardsDTO, MultiCard>();
        }
    }
}