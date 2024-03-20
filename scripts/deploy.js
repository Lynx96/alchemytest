async function main(){
    const HelloWorld = await ethers.getContractFactory("HelloWorld");

    const hello_world = await HelloWorld.deploy("Hello World!");
    await hello_world.waitForDeployment();
    const hello_worldDeployedAddress = await hello_world.getAddress();
    console.log("Contract deployed to address: ", hello_worldDeployedAddress);

}

main ()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });