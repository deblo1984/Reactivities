using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new QueryById.Query { Username = username }));
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [Authorize]
        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetUserActivities(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query { Username = username, Predicate = predicate }));
        }


    }
}