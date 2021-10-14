using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Threading.Tasks;
using backend.Models;

namespace barterserv
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
             services.AddDbContext<BarterContext>(opt => opt.UseMySql(
               Configuration.GetConnectionString("barter-mysql"))
          ); 
            services.AddControllersWithViews()
                    .AddNewtonsoftJson();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "../ClientApp/build";
            });
               var key = Encoding.ASCII.GetBytes("my-super-secret-key"); 
                  
            services.AddAuthentication(x => { 
                        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; 
                        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; 
              }) 
                 .AddJwtBearer(x => { 
                    
                         x.RequireHttpsMetadata = true; 
                         x.SaveToken = true; 
                   
                         x.TokenValidationParameters = new TokenValidationParameters { 
                    
                         ValidateIssuerSigningKey = true, 
                         IssuerSigningKey = new SymmetricSecurityKey(key), 
                    
                         ValidateIssuer = false, 
                   
                         ValidateAudience = false, 
                    
                         ValidateLifetime = true, 
                     
                         ClockSkew = TimeSpan.Zero  
                 }; 
                        x.Events = new JwtBearerEvents { 
                     
                         OnAuthenticationFailed = context => { 
                    
                           if (context.Exception.GetType() == typeof(SecurityTokenExpiredException)) { 
                      
                        context.Response.Headers.Add("Token-Expired", "true"); 
                    } 
                    return Task.CompletedTask; 
                } 
            }; 
        }); 
    }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            
            app.UseHttpsRedirection();
            app.UseDefaultFiles(); 
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "../ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");

                    // Utilisez cette ligne si le front-end angular est exécuté en dehors de VS (ou dans une autre instance de VS) 
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); 
                }
            });
        }
    }
}
