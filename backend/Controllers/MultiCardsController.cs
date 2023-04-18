using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    public class MultiCardsController : BaseAPIController
    {

        private readonly MinervaContext _context;
        private readonly IMapper _mapper;

        public MultiCardsController(MinervaContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<MultiCard>>> GetMultiCards()
        {
            return await _context.MultiCards.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<MultiCard>> GetMultiCard(int id)
        {
            return await _context.MultiCards.FindAsync(id);
        }

        // Creates a new card

        [HttpPost("create")]

        public async Task<ActionResult<MultiCard>> CreateMultiCard([FromForm] MultiCardsDTO multiCardDTO)
        {
            var multiCard = _mapper.Map<MultiCard>(multiCardDTO);
            _context.MultiCards.Add(multiCard);

            var res = await _context.SaveChangesAsync() > 0;
            if (res) return Ok(multiCard);
            return BadRequest();
        }

        // Fetching the categories of the public cards.

        [HttpGet("publicCateg")]

        public async Task<ActionResult> GetPublicCategories()
        {
            var cards = await _context.MultiCards.Where(c => c.Public == 1).ToListAsync();
            var categs = cards.Select(c => c.Category).Distinct().ToList();

            return Ok(categs);
        }

        // Fetching the categories of the private cards.

        [HttpGet("privateCateg/{id}")]

        public async Task<ActionResult> GetPrivateCategories(int id)
        {
            var cards = await _context.MultiCards.Where(c => c.UserID == id).ToListAsync();
            var categs = cards.Select(c => c.Category).Distinct().ToList();

            return Ok(categs);
        }

        // Fetching the cards from the category chosen

        [HttpGet("categ/{categ}")]

        public async Task<ActionResult> GetRandomPublicCard(string categ)
        {
            var card = await _context.MultiCards.Where(c => c.Category == categ).ToListAsync();
            return Ok(card);
        }

        [HttpGet("public/{categ}")]

        public async Task<ActionResult> GetPublicCards(string categ)
        {
            var card = await _context.MultiCards.Where(c => c.Category == categ).ToListAsync();
            var q = card.Where(c => c.Public == 1);
            return Ok(q);
        }       

        [HttpGet("priate/{categ}")]

        public async Task<ActionResult> GetPrivateCards(string categ)
        {
            var card = await _context.MultiCards.Where(c => c.Category == categ).ToListAsync();
            var q = card.Where(c => c.Public == 0);
            return Ok(q);
        }

        [HttpGet("count/{categ}")]

        public async Task<ActionResult> GetNumberOfCards(string categ)
        {
            var q = await _context.MultiCards.Where(c => c.Category == categ).ToListAsync();
            var qp = q.Where(c => c.Public == 1);
            var result = qp.Count();
            return Ok(result);
        }

        [HttpGet("countPriv/{categ}")]

        public async Task<ActionResult> GetNumberOfPrivCards(string categ)
        {
            var q = await _context.MultiCards.Where(c => c.Category == categ).ToListAsync();
            var qp = q.Where(c => c.Public == 0);
            var result = qp.Count();
            return Ok(result);
        }

        [HttpGet("{categ}/{limit}")]

        public async Task<ActionResult> GetCardsWithLimit(string categ, int limit)
        {
            var random = new Random();
            var cards = await _context.MultiCards.Where(c => c.Category == categ).ToListAsync();

            var query = cards.OrderBy(c => random.Next()).Take(limit);

            return Ok(query);
        }
        [HttpPut]

        public async Task<ActionResult<MultiCard>> EditFlipCard([FromForm] EditMultiCardsDTO multiCardDTO)
        {
            var multiCard = await _context.MultiCards.FindAsync(multiCardDTO.Id);

            if (multiCard == null) return NotFound();

            _mapper.Map(multiCardDTO, multiCard);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(multiCard);

            return BadRequest();
        }
        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteMultiCard(int id)
        {
            var multiCard = await _context.MultiCards.FindAsync(id);

            if (multiCard == null) return NotFound();

            _context.MultiCards.Remove(multiCard);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                Ok();
            }

            return BadRequest();
        }
    }

}