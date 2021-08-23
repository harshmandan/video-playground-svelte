<script lang="ts">
	export let fill: string = "",
		icon: string,
		action: any = () => {};
</script>

<svg on:click={action} class={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path d={icon} />
</svg>

<style>
	svg {
		vertical-align: middle;
	}
</style>
