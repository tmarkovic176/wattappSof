﻿using API.Models.HelpModels;
using API.Models.Paging;
using API.Models.Users;
using API.Services.DsoService;
using API.Services.ProsumerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DsoController : Controller
    {
        private readonly IDsoService dsoService;
        private static User user = new User();

        public DsoController(IDsoService dsoService)
        {
            this.dsoService = dsoService;
        }

        [HttpGet("GetDsoById")]
        public async Task<ActionResult<Dso>> GetDsoWorkerById(string id)
        {
            Dso worker;
            try
            {
                worker = await dsoService.GetDsoWorkerById(id);
                return Ok(worker);
            }
            catch (Exception)
            {
                return BadRequest("No DSO Worker with that id!");
            }
        }

        [HttpDelete("DeleteDsoWorker")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> DeleteDsoWorker(string id)
        {
            if (await dsoService.DeleteDsoWorker(id)) return Ok(new { error = true, message = "Successfuly deleted user" });

            return BadRequest("Could not remove user!");
        }

        [HttpPut("UpdateDsoWorker")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> EditDsoWorker(string id, DsoEdit newValues)
        {
            if (!await dsoService.EditDsoWorker(id, newValues)) return BadRequest("User could not be updated!");
            return Ok(new { error = true, message = "User updated successfully!" });

        }

        [HttpGet("GetAllDsoWorkers")]
        public async Task<ActionResult> GetAllDsoWorkers()
        {
            try
            {
                return Ok(await dsoService.GetAllDsos());
            }
            catch (Exception)
            {
                return BadRequest("No DSO Workers found!");
            }
        }
        [HttpGet("GetDsoWorkerPaging")]
        public async Task<ActionResult<IEnumerable<Dso>>> getProsumersPaging([FromQuery] DsoWorkerParameters dsoWorkersParameters)
        {

            return await dsoService.GetDsoWorkers(dsoWorkersParameters);
           
        }
        [HttpGet("GetWorkersByRegionId")]
        public async Task<ActionResult<List<Dso>>> GetWorkersByRegionId(string RegionID)
        {
            List<Dso> workers;
            try
            {
                workers = await dsoService.GetDsoWorkersByRegionId(RegionID);
                return Ok(workers);
            }
            catch (Exception)
            {
                return BadRequest("There is no workers for this region!");
            }
        }
        [HttpGet("GetWorkersByRoleId")]
        public async Task<ActionResult<List<Dso>>> GetWorkersbyRoleId(long RoleID)
        {
            List<Dso> workers;
            try
            {
                workers = await dsoService.GetWorkersbyRoleId(RoleID);
                return Ok(workers);
            }
            catch (Exception)
            {
                return BadRequest("There is no workers with this role!");
            }
        }
        [HttpGet("GetWorkerByFilter")]
        public async Task<ActionResult<IEnumerable<Dso>>> GetWorkerByFilter(string RegionID, long RoleID)
        {
            IEnumerable<Dso> workersFiler;
            try
            {
                workersFiler = await dsoService.GetWorkerByFilter( RegionID, RoleID);

                return Ok(workersFiler);
            }
            catch (Exception)
            {
                return BadRequest("There is no workers with this role!");
            }

        }

        [HttpGet("GetRoles")]
        [Authorize]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                return Ok(await dsoService.GetRoles());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetRegions")]
        [Authorize]
        public async Task<IActionResult> GetRegions()
        {
            try
            {
                return Ok(await dsoService.GetRegions());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetRoleName")]
        public async Task<IActionResult> GetRoleName(long id)
        {
            try
            {
                return Ok(await dsoService.GetRoleName(id));
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetRegionName")]
        public async Task<IActionResult> GetRegionName(string id)
        {
            try
            {
                return Ok(await dsoService.GetRegionName(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateProsumerByDso")]
        public async Task<IActionResult> UpdateProsumerByDso(ChangeProsumerbyDSO change)
        {
            Prosumer prosumer = await dsoService.UpdateProsumerByDso(change);
            if(prosumer == null) return BadRequest("ID Prosumer is not exists in database!");
            try
            {

                return Ok(new
                {
                    UpdateProsumerID = prosumer.Id,
                    FirstName = prosumer.FirstName,
                    LastName = prosumer.LastName,
                    UserName = prosumer.Username,
                    Address = prosumer.Address,
                    Email = prosumer.Email,
                    CityID = prosumer.CityId,
                    NeigborhoodID = prosumer.NeigborhoodId,
                    Latitude = prosumer.Latitude,
                    Longitude = prosumer.Longitude

                });
            }
            catch(Exception ex)
            {

                return BadRequest(ex.Message);
            }


        }
    }
}
