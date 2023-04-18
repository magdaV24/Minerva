using System.Reflection.Metadata.Ecma335;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class FlipCardsController: BaseAPIController
    {
        private readonly MinervaContext _context;
        private readonly IMapper _mapper;

        public FlipCardsController(MinervaContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<FlipCard>>> GetFlipCards()
        {
            return await _context.FlipCards.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<FlipCard>> GetFlipCard(int id)
        {
            return await _context.FlipCards.FindAsync(id);
        }

        // The user can create a new flip card.
        [HttpPost("create")]

        public async Task<ActionResult> CreateFlipCard(FlipCardDTO flipCardDTO)
        {
            var flipCard = _mapper.Map<FlipCard>(flipCardDTO);
            _context.FlipCards.Add(flipCard);

            var res = await _context.SaveChangesAsync() > 0;
            if(res){
                return StatusCode(201);
            }
            return BadRequest();
        }

        // Fetching the categories of the public cards.

        [HttpGet("publicCateg")]

        public async Task<ActionResult> GetPublicCategories()
        {
            var cards = await _context.FlipCards.Where(c => c.Public == 1).ToListAsync();
            var categs = cards.Select(c => c.Category).Distinct().ToList();

            return Ok(categs);
        }

        // Fetching the categories of the private cards.

        [HttpGet("privateCateg/{id}")]

        public async Task<ActionResult> GetPrivateCategories(int id)
        {
            var cards = await _context.FlipCards.Where(c => c.UserID == id).ToListAsync();
            var categs = cards.Select(c => c.Category).Distinct().ToList();

            return Ok(categs);
        }

        // Fetching the cards from the category chosen

        [HttpGet("categ/{categ}")]

        public async Task<ActionResult> GetRandomPublicCard(string categ)
        {
            var card = await _context.FlipCards.Where(c => c.Category == categ).ToListAsync();
            return Ok(card);
        }

        [HttpGet("public/{categ}")]

        public async Task<ActionResult> GetPublicCards(string categ)
        {
            var card = await _context.FlipCards.Where(c => c.Category == categ).ToListAsync();
            var q = card.Where(c => c.Public == 1);
            return Ok(q);
        }

        [HttpGet("private/{categ}")]

        public async Task<ActionResult> GetPrivateCards(string categ)
        {
            var card = await _context.FlipCards.Where(c => c.Category == categ).ToListAsync();
            var q = card.Where(c => c.Public == 0);
            return Ok(q);
        }

       [HttpGet("count/{categ}")]

        public async Task<ActionResult> GetNumberOfCards(string categ)
        {
            var q = await _context.FlipCards.Where(c => c.Category == categ).ToListAsync();
            var qp = q.Where(c => c.Public == 1);
            var result = qp.Count();
            return Ok(result);
        }

        [HttpGet("countPriv/{categ}")]

        public async Task<ActionResult> GetNumberOfPrivCards(string categ)
        {
            var q = await _context.FlipCards.Where(c => c.Category == categ).ToListAsync();
            var qp = q.Where(c => c.Public == 0);
            var result = qp.Count();
            return Ok(result);
        }


        [HttpPut]

        public async Task<ActionResult<FlipCard>>EditFlipCard([FromForm]EditFlipCardDTO flipCardDTO)
        {
            var flipCard = await _context.FlipCards.FindAsync(flipCardDTO.Id);   

            if (flipCard == null) return NotFound();

            _mapper.Map(flipCardDTO, flipCard);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(flipCard);

            return BadRequest();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteFlipCard(int id)
        {
            var flipCard = await _context.FlipCards.FindAsync(id);

            if(flipCard == null) return NotFound();
            
            _context.FlipCards.Remove(flipCard);

            var result = await _context.SaveChangesAsync() > 0;

            if(result){
                Ok();
            }

            return BadRequest();
        }

    }
}